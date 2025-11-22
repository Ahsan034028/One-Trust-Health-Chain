const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const { Readable } = require("stream");
const pinataSDK = require("@pinata/sdk");
const { ethers } = require("ethers");

const Patient = require("../models/Patient");
const Record = require("../models/Record");
const requireDoctorAuth = require("../middlewares/requireDoctorAuth");
const requirePatientAuth = require("../middlewares/requirePatientAuth");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");

const RecordContractArtifact = require("../../../artifacts/contracts/RecordContract.sol/RecordContract.json");
const ConsentContractArtifact = require("../../../artifacts/contracts/ConsentContract.sol/ConsentContract.json");

// Use memory storage for multer (no disk writes)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: upload buffer to MongoDB GridFS and return file id
const uploadToGridFS = (buffer, filename, metadata = {}) => {
	return new Promise((resolve, reject) => {
		if (!mongoose.connection.db) return reject(new Error("MongoDB not connected"));

		const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
		const uploadStream = bucket.openUploadStream(filename, { metadata });
		uploadStream.on("error", (err) => reject(err));
		uploadStream.on("finish", () => resolve(uploadStream.id));
		uploadStream.end(buffer);
	});
};

// POST /api/record/upload
// multipart/form-data: file, patientId, title, description
router.post("/upload", requireDoctorAuth, upload.single("file"), async (req, res) => {
	try {
		const { patientId, title, description } = req.body;

		if (!patientId || !title) return res.status(400).json({ msg: "`patientId` and `title` are required" });

		const patient = await Patient.findById(patientId);
		if (!patient) return res.status(404).json({ msg: "Patient not found" });

		// Authorization: patient must have the requesting doctor as their assigned doctor
		if (String(patient.doctor) !== String(req.doctor._id)) {
			return res.status(403).json({ msg: "Doctor not authorized by patient" });
		}

		// File must be present (from memory storage)
		if (!req.file || !req.file.buffer) return res.status(400).json({ msg: "File is required (field name: file)" });

		// Pin to Pinata
		const pinataKey = process.env.PINATA_API_KEY || "520f384a81d626ee891e";
		const pinataSecret = process.env.PINATA_SECRET_API_KEY || "b8aa48852deb1fdab9b9f0bba80f7b85a10ff75adae91c053c0b5df8898eceee";
		if (!pinataKey || !pinataSecret) {
			return res.status(500).json({ msg: "Pinata API keys not configured" });
		}

		// Instantiate Pinata SDK robustly (handles both function and class exports)
		const PinataModule = pinataSDK;
		const PinataFactory = PinataModule && PinataModule.default ? PinataModule.default : PinataModule;
		let pinata;
		if (typeof PinataFactory === "function") {
			try {
				pinata = PinataFactory(pinataKey, pinataSecret);
			} catch (e) {
				// Some builds export a class that must be called with `new`
				pinata = new PinataFactory(pinataKey, pinataSecret);
			}
		} else {
			return res.status(500).json({ msg: "Invalid Pinata SDK export" });
		}

		// Create a readable stream from the buffer
		const readableStreamForPin = Readable.from(req.file.buffer);

				// Pin the in-memory stream to Pinata
				// pinFileToIPFS requires pinataMetadata.name to be set for the file
				let pinResult;
				try {
					pinResult = await pinata.pinFileToIPFS(readableStreamForPin, {
						pinataMetadata: { name: req.file.originalname || `upload-${Date.now()}` },
						pinataOptions: { cidVersion: 1 }
					});
				} catch (pinErr) {
					console.error("Pinata pinFileToIPFS error:", pinErr);
					return res.status(502).json({ msg: "Pinata pin failed", error: pinErr.message || pinErr.toString() });
				}
		// pinResult: { IpfsHash, PinSize, Timestamp }
		const ipfsHash = pinResult.IpfsHash;

		// Save file into MongoDB GridFS (so file is kept in DB, not on disk)
		let gridFsId = null;
		try {
			gridFsId = await uploadToGridFS(req.file.buffer, req.file.originalname, { uploadedBy: req.doctor._id, ipfsHash });
		} catch (err) {
			console.warn("GridFS upload failed, continuing:", err.message);
		}

		// Store hash on-chain using doctor's private key
		const rpc = process.env.RPC_URL || "http://127.0.0.1:8545";
		const recordContractAddress = process.env.RECORD_CONTRACT_ADDRESS || "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
		if (!recordContractAddress) return res.status(500).json({ msg: "Record contract address not configured" });

		const provider = new ethers.providers.JsonRpcProvider(rpc);
		const wallet = new ethers.Wallet(req.doctor.privateKey, provider);
		const recordContract = new ethers.Contract(recordContractAddress, RecordContractArtifact.abi, wallet);

		// patient.walletAddress is expected to be an Ethereum address
		const tx = await recordContract.uploadRecord(patient.walletAddress, ipfsHash);
		const receipt = await tx.wait();

		// Save record metadata in DB
		const record = new Record({
			patient: patient._id,
			doctor: req.doctor._id,
			title,
			description,
			fileUrl: `ipfs://${ipfsHash}`,
			metadata: { ipfsHash, txHash: receipt.transactionHash },
		});

		await record.save();

		return res.status(201).json({ success: true, record, txHash: receipt.transactionHash });
	} catch (err) {
		console.error("Upload error:", err);
		return res.status(500).json({ msg: "Upload failed", error: err.message });
	}
});

module.exports = router;

// ----------------------
// View records endpoints
// ----------------------

// Helper: resolve patient by MongoDB id or wallet address
async function resolvePatientByIdOrWallet(patientId) {
  
	if (!patientId) return null;
	if (mongoose.Types.ObjectId.isValid(patientId)) {
		return await Patient.findById(patientId);
	}
	if (/^0x[a-fA-F0-9]{40}$/.test(patientId)) {
		return await Patient.findOne({ walletAddress: patientId.toLowerCase() });
	}
	return null;
}

// Convenience alias: allow requests to use query param `patientId` instead of path param
// GET /api/record/doctor/patient?patientId=<id_or_wallet>&index=n
router.get("/doctor/patient", requireDoctorAuth, async (req, res) => {
	try {
		const { patientId } = req.query;
		if (!patientId) return res.status(400).json({ msg: "Missing patientId query parameter" });
		const index = req.query.index !== undefined ? Number(req.query.index) : undefined;

		const patient = await resolvePatientByIdOrWallet(patientId);
		if (!patient) return res.status(404).json({ msg: "Patient not found" });

		const rpc = process.env.RPC_URL || "http://127.0.0.1:8545";
		const provider = new ethers.providers.JsonRpcProvider(rpc);

		const consentAddress = process.env.CONSENT_CONTRACT_ADDRESS;
		if (!consentAddress) {
			return res.status(500).json({ msg: "Consent contract address not configured (CONSENT_CONTRACT_ADDRESS)" });
		}
		const consentContract = new ethers.Contract(consentAddress, ConsentContractArtifact.abi, provider);
		const hasConsent = await consentContract.hasConsent(patient.walletAddress, req.doctor.walletAddress);
		if (!hasConsent) return res.status(403).json({ msg: "Doctor not authorized to view this patient's records (consent missing)" });

		const recordContractAddress = process.env.RECORD_CONTRACT_ADDRESS || "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
		if (!recordContractAddress) return res.status(500).json({ msg: "Record contract address not configured" });
		const recordContract = new ethers.Contract(recordContractAddress, RecordContractArtifact.abi, provider);

		const records = await recordContract.getRecords(patient.walletAddress);
		const normalized = records.map((r) => ({ ipfsHash: r.ipfsHash, timestamp: Number(r.timestamp), uploadedBy: r.uploadedBy }));

		if (index !== undefined) {
			if (index < 0 || index >= normalized.length) return res.status(404).json({ msg: "Record index out of range" });
			return res.json({ record: normalized[index] });
		}

		const dbRecords = await Record.find({ patient: patient._id }).sort({ createdAt: -1 });
		return res.json({ records: normalized, dbRecords });
	} catch (err) {
		console.error("Doctor alias view error:", err);
		return res.status(500).json({ msg: "Failed to fetch records", error: err.message });
	}
});

// GET /api/record/doctor/:patientId?index=n
// Doctor can view a patient's records (only if assigned doctor)
router.get("/doctor/:patientId", requireDoctorAuth, async (req, res) => {
	try {
		const { patientId } = req.params;
		const index = req.query.index !== undefined ? Number(req.query.index) : undefined;

		const patient = await resolvePatientByIdOrWallet(patientId);
        console.log(patient)
		if (!patient) return res.status(404).json({ msg: "Patient not found" });

		// Authorization: assigned doctor only
		const rpc = process.env.RPC_URL || "http://127.0.0.1:8545";
		const provider = new ethers.providers.JsonRpcProvider(rpc);

		// Authorization: require on-chain consent. Assigned doctor field alone does not grant access.
		{
			const consentAddress = process.env.CONSENT_CONTRACT_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
			if (!consentAddress) {
				return res.status(500).json({ msg: "Consent contract address not configured (CONSENT_CONTRACT_ADDRESS)" });
			}
			const consentContract = new ethers.Contract(consentAddress, ConsentContractArtifact.abi, provider);
			const hasConsent = await consentContract.hasConsent(patient.walletAddress, req.doctor.walletAddress);
			if (!hasConsent) return res.status(403).json({ msg: "Doctor not authorized to view this patient's records (consent missing)" });
		}

		const recordContractAddress = process.env.RECORD_CONTRACT_ADDRESS || "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
        
		if (!recordContractAddress) return res.status(500).json({ msg: "Record contract address not configured" });

		
		const recordContract = new ethers.Contract(recordContractAddress, RecordContractArtifact.abi, provider);

		const records = await recordContract.getRecords(patient.walletAddress);

		// Normalize records (ethers returns BigNumber / BigInt types)
		const normalized = records.map((r) => ({ ipfsHash: r.ipfsHash, timestamp: Number(r.timestamp), uploadedBy: r.uploadedBy }));

		// If index specified, return single record
		if (index !== undefined) {
			if (index < 0 || index >= normalized.length) return res.status(404).json({ msg: "Record index out of range" });
			return res.json({ record: normalized[index] });
		}

		// Also include DB metadata where available
		const dbRecords = await Record.find({ patient: patient._id }).sort({ createdAt: -1 });

		return res.json({ records: normalized, dbRecords });
	} catch (err) {
		console.error("Doctor view error:", err);
		return res.status(500).json({ msg: "Failed to fetch records", error: err.message });
	}
});






// GET /api/record/doctor/:patientId/record/:index
// Access a specific record by 1-based index (more user-friendly)
router.get("/doctor/:patientId/record/:index", requireDoctorAuth, async (req, res) => {
	try {
		const { patientId } = req.params;
		const indexParam = parseInt(req.params.index, 10);
		if (isNaN(indexParam) || indexParam < 1) return res.status(400).json({ msg: "Index must be a positive integer (1-based)" });

		const patient = await resolvePatientByIdOrWallet(patientId);
		if (!patient) return res.status(404).json({ msg: "Patient not found" });

		const rpc = process.env.RPC_URL || "http://127.0.0.1:8545";
		const provider = new ethers.providers.JsonRpcProvider(rpc);

		// Authorization: require on-chain consent. Assigned doctor field alone does not grant access.
		{
			const consentAddress = process.env.CONSENT_CONTRACT_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
			if (!consentAddress) {
				return res.status(500).json({ msg: "Consent contract address not configured (CONSENT_CONTRACT_ADDRESS)" });
			}
			const consentContract = new ethers.Contract(consentAddress, ConsentContractArtifact.abi, provider);
			const hasConsent = await consentContract.hasConsent(patient.walletAddress, req.doctor.walletAddress);
			console.log(hasConsent)
			if (!hasConsent) return res.status(403).json({ msg: "Doctor not authorized to view this patient's records (consent missing)" });
		}

		const recordContractAddress = process.env.RECORD_CONTRACT_ADDRESS || "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
		const recordContract = new ethers.Contract(recordContractAddress, RecordContractArtifact.abi, provider);

		const records = await recordContract.getRecords(patient.walletAddress);
		const normalized = records.map((r) => ({ ipfsHash: r.ipfsHash, timestamp: Number(r.timestamp), uploadedBy: r.uploadedBy }));

		const idx = indexParam - 1; // convert 1-based to 0-based
		if (idx < 0 || idx >= normalized.length) return res.status(404).json({ msg: "Record index out of range" });

		const selected = normalized[idx];

		// Try to enrich with DB metadata
		const dbRecord = await Record.findOne({ patient: patient._id, "metadata.ipfsHash": selected.ipfsHash });

		return res.json({ record: selected, dbRecord });
	} catch (err) {
		console.error("Doctor indexed view error:", err);
		return res.status(500).json({ msg: "Failed to fetch record", error: err.message });
	}
});

// GET /api/record/patient?patientId=<id_or_wallet>&index=n
// Accessible by the patient themself (no params) OR by an authorized doctor (must provide patientId)
router.get("/patient", async (req, res) => {
	try {
		// Extract token from cookie or Authorization header
		const token = req.cookies?.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);
		if (!token) return res.status(401).json({ msg: "Missing auth token" });

		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
		} catch (err) {
			return res.status(401).json({ msg: "Invalid or expired token" });
		}

		// Determine if token belongs to a doctor or a patient
		const possibleDoctor = await Doctor.findById(decoded.id).select("_id");
		const possiblePatient = await Patient.findById(decoded.id).select("_id walletAddress");

		const rpc = process.env.RPC_URL || "http://127.0.0.1:8545";
		const recordContractAddress = process.env.RECORD_CONTRACT_ADDRESS || "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
		if (!recordContractAddress) return res.status(500).json({ msg: "Record contract address not configured" });
		const provider = new ethers.providers.JsonRpcProvider(rpc);
		const recordContract = new ethers.Contract(recordContractAddress, RecordContractArtifact.abi, provider);

		const index = req.query.index !== undefined ? Number(req.query.index) : undefined;

		// If doctor token
		if (possibleDoctor) {
			// load full doctor to get walletAddress
			const doctor = await Doctor.findById(decoded.id);
			const patientIdParam = req.query.patientId;
			if (!patientIdParam) return res.status(400).json({ msg: "Doctors must provide patientId as query parameter" });

			const patient = await resolvePatientByIdOrWallet(patientIdParam);
			if (!patient) return res.status(404).json({ msg: "Patient not found" });

			// Authorization: require on-chain consent only (assigned-doctor DB field is not sufficient)
			const consentAddress = process.env.CONSENT_CONTRACT_ADDRESS;
			if (!consentAddress) return res.status(500).json({ msg: "Consent contract address not configured (CONSENT_CONTRACT_ADDRESS)" });
			const consentContract = new ethers.Contract(consentAddress, ConsentContractArtifact.abi, provider);
			const hasConsent = await consentContract.hasConsent(patient.walletAddress, doctor.walletAddress);
			if (!hasConsent) return res.status(403).json({ msg: "Doctor not authorized to view this patient's records (consent missing or revoked)" });

			const records = await recordContract.getRecords(patient.walletAddress);
			const normalized = records.map((r) => ({ ipfsHash: r.ipfsHash, timestamp: Number(r.timestamp), uploadedBy: r.uploadedBy }));

			if (index !== undefined) {
				if (index < 0 || index >= normalized.length) return res.status(404).json({ msg: "Record index out of range" });
				const selected = normalized[index];
				const dbRecord = await Record.findOne({ patient: patient._id, "metadata.ipfsHash": selected.ipfsHash });
				return res.json({ record: selected, dbRecord });
			}

			const dbRecords = await Record.find({ patient: patient._id }).sort({ createdAt: -1 });
			return res.json({ records: normalized, dbRecords });
		}

		// If patient token
		if (possiblePatient) {
			const patient = possiblePatient;

			const records = await recordContract.getRecords(patient.walletAddress);
			const normalized = records.map((r) => ({ ipfsHash: r.ipfsHash, timestamp: Number(r.timestamp), uploadedBy: r.uploadedBy }));

			if (index !== undefined) {
				if (index < 0 || index >= normalized.length) return res.status(404).json({ msg: "Record index out of range" });
				return res.json({ record: normalized[index] });
			}

			const dbRecords = await Record.find({ patient: patient._id }).sort({ createdAt: -1 });
			return res.json({ records: normalized, dbRecords });
		}

		return res.status(403).json({ msg: "Token does not belong to a valid doctor or patient" });
	} catch (err) {
		console.error("Patient/Doctor view error:", err);
		return res.status(500).json({ msg: "Failed to fetch records", error: err.message });
	}
});

// GET /api/record/patient/record/:index
// Patient accesses a specific record by 1-based index
router.get("/patient/record/:index", requirePatientAuth, async (req, res) => {
	try {
		const indexParam = parseInt(req.params.index, 10);
		if (isNaN(indexParam) || indexParam < 1) return res.status(400).json({ msg: "Index must be a positive integer (1-based)" });

		const patientFromTokenId = req.patient?.id || req.patient?._id;
		if (!patientFromTokenId) return res.status(401).json({ msg: "Invalid patient token" });

		const patient = await Patient.findById(patientFromTokenId);
		if (!patient) return res.status(404).json({ msg: "Patient not found" });

		const rpc = process.env.RPC_URL || "http://127.0.0.1:8545";
		const recordContractAddress = process.env.RECORD_CONTRACT_ADDRESS || "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
		const provider = new ethers.providers.JsonRpcProvider(rpc);
		const recordContract = new ethers.Contract(recordContractAddress, RecordContractArtifact.abi, provider);

		const records = await recordContract.getRecords(patient.walletAddress);
		const normalized = records.map((r) => ({ ipfsHash: r.ipfsHash, timestamp: Number(r.timestamp), uploadedBy: r.uploadedBy }));

		const idx = indexParam - 1;
		if (idx < 0 || idx >= normalized.length) return res.status(404).json({ msg: "Record index out of range" });

		const selected = normalized[idx];
		const dbRecord = await Record.findOne({ patient: patient._id, "metadata.ipfsHash": selected.ipfsHash });

		return res.json({ record: selected, dbRecord });
	} catch (err) {
		console.error("Patient indexed view error:", err);
		return res.status(500).json({ msg: "Failed to fetch record", error: err.message });
	}
});
