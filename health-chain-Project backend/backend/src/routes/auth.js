const express = require("express");
const { ethers } = require("ethers");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Hospital = require("../models/Hospital.js");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Identity = require("../../../artifacts/contracts/IdentityContract.sol/IdentityContract.json");

dotenv.config();

const router = express.Router();

// --- 🧱 Blockchain Setup ---
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const identityAddress = process.env.IDENTITY_CONTRACT_ADDRESS;

// Helper: connect to contract
const getContract = (privateKey) => {
  const wallet = new ethers.Wallet(privateKey, provider);
  return new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Identity.abi, wallet);
};


// --- 🛡️ Auth Middleware ---
const requireHospitalAuth = async (req, res, next) => {
  try {
    // Read token from cookies
    const token = req.cookies?.token;
   
    if (!token) {
      return res.status(401).json({ msg: "Missing auth token in cookies" });
    }

    // Verify JWT token
    const decoded = require("jsonwebtoken").verify(
      token,
      process.env.JWT_SECRET || "supersecretkey"
    );

    // Find hospital in database
    const hospital = await Hospital.findById(decoded.id);
    if (!hospital) {
      return res.status(401).json({ msg: "Hospital not found" });
    }

    // Attach hospital object to request
    req.hospital = hospital;

    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};





const requireDoctorAuth = async (req, res, next) => {
  try {
    // 1. Read token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ msg: "Missing auth token in cookies" });
    }

    // 2. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretkey"
    );

    // 3. Find doctor in database
    const doctor = await Doctor.findById(decoded.id);

    if (!doctor) {
      return res.status(401).json({ msg: "Doctor not found" });
    }

    // 4. Attach doctor to request object
    req.doctor = doctor;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};



//
// =====================================================================
// 🏥 REGISTER HOSPITAL
// =====================================================================
router.post("/hospital/register", async (req, res) => {
  try {
    const {
      name,
      walletAddress,
      email,
      phone,
      registrationId,
      logo,
      address,
      city,
      password,
      privateKey,
    } = req.body;

    // --- Validate Required Fields ---
    if (
      !name ||
      !walletAddress ||
      !email ||
      !phone ||
      !registrationId ||
      !password ||
      !privateKey
    ) {
      return res
        .status(400)
        .json({ msg: "All required fields must be provided." });
    }

    // --- Validate Wallet Address ---
    if (!ethers.isAddress(walletAddress)) {
      return res.status(400).json({ msg: "Invalid wallet address format." });
    }

    // --- Check If Already Registered in DB ---
    const existing = await Hospital.findOne({ walletAddress });
    if (existing) {
      return res.status(400).json({ msg: "Hospital already registered." });
    }

    // --- Register on Blockchain ---
    const contract = getContract(privateKey);

    const tx = await contract.registerHospital(); // Solidity call
    await tx.wait();

    // --- Hash Password ---
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- Save in MongoDB ---
    const newHospital = new Hospital({
      name,
      walletAddress,
      email,
      phone,
      registrationId,
      logo,
      address,
      city,
      password: hashedPassword,
      privateKey,
      txHash: tx.hash,
    });

    await newHospital.save();

    // --- Response ---
    res.status(201).json({
      success: true,
      msg: "✅ Hospital registered successfully!",
      txHash: tx.hash,
      hospital: {
        id: newHospital._id,
        name,
        walletAddress,
        email,
        phone,
        city,
      },
    });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
});

//
// =====================================================================
// 🔐 LOGIN HOSPITAL
// =====================================================================
router.post("/hospital/login", async (req, res) => {
  try {
    const { walletAddress, password, privateKey } = req.body;

    // --- Validate Fields ---
    if (!walletAddress || !password || !privateKey) {
      return res
        .status(400)
        .json({ msg: "Wallet address, password, and private key are required." });
    }

    // --- Check DB for Hospital ---
    const hospital = await Hospital.findOne({ walletAddress });
    if (!hospital) {
      return res
        .status(404)
        .json({ msg: "Hospital not found. Please register first." });
    }

    // --- Verify Password ---
    const isPasswordValid = await bcrypt.compare(password, hospital.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password." });
    }

    // --- Check Role on Blockchain ---
    const contract = getContract(privateKey);
    const role = await contract.getRole(walletAddress);

    // Role enum in Solidity → 0=None, 1=Hospital, 2=Doctor, 3=Patient
    if (Number(role) !== 1) {
      return res
        .status(400)
        .json({ msg: "This wallet is not registered as a hospital on blockchain." });
    }

    // --- Generate JWT ---
    const token = jwt.sign(
      {
        id: hospital._id,
        walletAddress: hospital.walletAddress,
        name: hospital.name,
      },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    // --- Response ---
    res
  .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600000 })
  .status(200)
  .json({
    success: true,
    msg: "Login successful ✅",
    hospital: {
      id: hospital._id,
      name: hospital.name,
      walletAddress: hospital.walletAddress,
      email: hospital.email,
      phone: hospital.phone,
      city: hospital.city,
    },
  });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({
      msg: "Login failed",
      error: error.message,
    });
  }
});




// =====================================================================
// 👨‍⚕️ REGISTER DOCTOR
// =====================================================================
router.post("/doctor/register", requireHospitalAuth, async (req, res) => {
  try {
    const {
      name,
      walletAddress,
      email,
      phone,
      specialization,
      licenseId,
      password,
      privateKey // Doctor's private key
    } = req.body;

    // --- Validate Required Fields ---
    if (!name || !walletAddress || !email || !phone || !specialization || !licenseId || !password || !privateKey)
      return res.status(400).json({ msg: "All required fields must be provided." });

    // --- Validate Wallet Address ---
    if (!ethers.isAddress(walletAddress))
      return res.status(400).json({ msg: "Invalid doctor wallet address format." });

    // --- Check DB for Doctor ---
    const existing = await Doctor.findOne({ walletAddress });
    if (existing)
      return res.status(400).json({ msg: "Doctor wallet already registered." });

    // --- Register on Blockchain ---
    // Only the HOSPITAL can call registerDoctor; use the hospital's privateKey
    const contract = getContract(req.hospital.privateKey);
    const tx = await contract.registerDoctor(walletAddress); // Hospital calls, doctor becomes registered
    await tx.wait();

    // --- Hash Password ---
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- Save in MongoDB ---
   const newDoctor = new Doctor({
  name,
  walletAddress,
  email,
  phone,
  specialization,
  licenseId,
  password: hashedPassword,
  privateKey,
  hospital: req.hospital._id, // ObjectId reference
  hospitalName: req.hospital.name, // <-- Add this!
  txHash: tx.hash,
});

    await newDoctor.save();

    // --- Response ---
    res.status(201).json({
      success: true,
      msg: "✅ Doctor registered successfully!",
      txHash: tx.hash,
      doctor: {
        id: newDoctor._id,
        name,
        walletAddress,
        email,
        phone,
        specialization,
        licenseId,
      },
    });
  } catch (err) {
    console.error("❌ Doctor Registration Error:", err);
    res.status(500).json({ msg: "Doctor registration failed", error: err.message });
  }
});


// =====================================================================
// 👨‍⚕️ login DOCTOR
// =====================================================================
router.post("/doctor/login", async (req, res) => {
  try {
    const { walletAddress, password, privateKey } = req.body;

    // --- Validate Fields ---
    if (!walletAddress || !password || !privateKey) {
      return res
        .status(400)
        .json({ msg: "Wallet address, password, and private key are required." });
    }

    // --- Check DB for Doctor ---
    const doctor = await Doctor.findOne({ walletAddress });
    if (!doctor) {
      return res
        .status(404)
        .json({ msg: "Doctor not found. Please register first." });
    }

    // --- Verify Password ---
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password." });
    }

    // --- Check Role on Blockchain ---
    const contract = getContract(privateKey);
    const role = await contract.getRole(walletAddress);

    if (Number(role) !== 2) {
      return res
        .status(400)
        .json({ msg: "This wallet is not registered as a doctor on blockchain." });
    }

    // --- Generate JWT ---
    const token = jwt.sign(
      {
        id: doctor._id,
        walletAddress: doctor.walletAddress,
        name: doctor.name,
        hospital: doctor.hospital,
        hospitalName: doctor.hospitalName,
      },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    // --- Set token in cookie ---
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour
      })
      .status(200)
      .json({
        success: true,
        msg: "Doctor login successful ✅",
    
        doctor: {
          id: doctor._id,
          name: doctor.name,
          walletAddress: doctor.walletAddress,
          email: doctor.email,
          phone: doctor.phone,
          hospitalName: doctor.hospitalName,
          specialization: doctor.specialization,
          licenseId: doctor.licenseId,
        },
      });
  } catch (error) {
    console.error("❌ Doctor Login Error:", error);
    res.status(500).json({
      msg: "Doctor login failed",
      error: error.message,
    });
  }
});




// =====================================================================
// 👨‍⚕️ login DOCTOR
// =====================================================================

router.post("/patient/register", requireDoctorAuth, async (req, res) => {
  try {
    console.log("bvdfjhvbfh")
    const { name, walletAddress, email, phone, password, privateKey } = req.body;

    // 1. Validate Required Fields
    if (!name || !walletAddress || !email || !phone || !password || !privateKey) {
      return res.status(400).json({ msg: "All required fields must be provided." });
    }

    // 2. Validate Wallet Address
    if (!ethers.isAddress(walletAddress)) {
      return res.status(400).json({ msg: "Invalid wallet address format." });
    }

    // 3. Check if Patient Already Exists
    const existing = await Patient.findOne({ walletAddress });
    if (existing) {
      return res.status(400).json({ msg: "Patient wallet already registered." });
    }

    // 4. Register Patient on Blockchain
    // Only the DOCTOR (req.doctor) can call registerPatient using their private key
    const contract = getContract(req.doctor.privateKey);
    const tx = await contract.registerPatient(walletAddress); // Doctor calls contract
    await tx.wait();

    // 5. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Save Patient in MongoDB
    const newPatient = new Patient({
      name,
      walletAddress,
      email,
      phone,
      password: hashedPassword,
      privateKey,
      doctor: req.doctor._id,
      doctorName: req.doctor.name,
      txHash: tx.hash,
    });

    await newPatient.save();

    // 7. Generate JWT
    const token = jwt.sign(
      {
        id: newPatient._id,
        walletAddress: newPatient.walletAddress,
        name: newPatient.name,
        doctor: newPatient.doctor,
        doctorName: newPatient.doctorName,
      },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    // 8. Set JWT in HTTP-only cookie & respond
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(201)
      .json({
        success: true,
        msg: "✅ Patient registered successfully!",
        txHash: tx.hash,
        token, // Optional: to send in body as well
        patient: {
          id: newPatient._id,
          name: newPatient.name,
          walletAddress: newPatient.walletAddress,
          email: newPatient.email,
          phone: newPatient.phone,
          doctorName: newPatient.doctorName,
        },
      });
  } catch (err) {
    console.error("❌ Patient Registration Error:", err);
    res.status(500).json({ msg: "Patient registration failed", error: err.message });
  }
});



// Patient Login route

router.post("/patient/login", async (req, res) => {
  try {
    const { walletAddress, password, privateKey } = req.body;

    if (!walletAddress || !password || !privateKey) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // --- Fetch patient from DB ---
    const patient = await Patient.findOne({ walletAddress });
    if (!patient) {
      return res.status(404).json({ msg: "Patient not found. Please register first." });
    }

    // --- Verify Password ---
    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password." });
    }

    // --- Blockchain Role Check ---
    const contract = getContract(privateKey);
    const role = await contract.getRole(walletAddress);

    if (Number(role) !== 3) {
      return res.status(400).json({ msg: "This wallet is not registered as a patient on blockchain." });
    }

    // --- Generate JWT Token ---
    const token = jwt.sign(
      {
        id: patient._id,
        walletAddress: patient.walletAddress,
        name: patient.name,
        doctor: patient.doctor,
        doctorName: patient.doctorName,
        role: 3,
      },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    // --- Set cookie (FIXED FOR LOCALHOST) ---
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // IMPORTANT for localhost
      sameSite: "lax", // allow cross-origin on local frontend
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      msg: "Patient login successful",
      token,
      patient: {
        id: patient._id,
        name: patient.name,
        walletAddress: patient.walletAddress,
        email: patient.email,
        phone: patient.phone,
        doctorName: patient.doctorName,
      },
    });

  } catch (error) {
    console.error("Patient Login Error:", error);
    res.status(500).json({
      msg: "Patient login failed",
      error: error.message,
    });
  }
});

module.exports = router;

