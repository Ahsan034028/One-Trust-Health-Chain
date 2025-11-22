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
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const identityAddress = process.env.IDENTITY_CONTRACT_ADDRESS;

// Helper: connect to contract
const getContract = (privateKey) => {
  const wallet = new ethers.Wallet(privateKey, provider);
  return new ethers.Contract(identityAddress || "0x5FbDB2315678afecb367f032d93F642f64180aa3", Identity.abi, wallet);
};

// --- 🛡️ Auth Middleware ---
const requireHospitalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ msg: "Missing auth token in cookies" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
    const hospital = await Hospital.findById(decoded.id);
    if (!hospital) return res.status(401).json({ msg: "Hospital not found" });

    req.hospital = hospital;
    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};

const requireDoctorAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ msg: "Missing auth token in cookies" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
    const doctor = await Doctor.findById(decoded.id);
    if (!doctor) return res.status(401).json({ msg: "Doctor not found" });

    req.doctor = doctor;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

// =====================================================================
// 🏥 REGISTER HOSPITAL
// =====================================================================
router.post("/hospital/register", async (req, res) => {
  try {
    const { name, walletAddress, email, phone, registrationId, logo, address, city, password, privateKey } = req.body;

    if (!name || !walletAddress || !email || !phone || !registrationId || !password || !privateKey) {
      return res.status(400).json({ msg: "All required fields must be provided." });
    }

    if (!ethers.utils.isAddress(walletAddress)) {
      return res.status(400).json({ msg: "Invalid wallet address format." });
    }

    const existing = await Hospital.findOne({ walletAddress });
    if (existing) return res.status(400).json({ msg: "Hospital already registered." });

    const contract = getContract(privateKey);
    const tx = await contract.registerHospital();
    await tx.wait();

    const hashedPassword = await bcrypt.hash(password, 10);

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

    res.status(201).json({
      success: true,
      msg: "✅ Hospital registered successfully!",
      txHash: tx.hash,
      hospital: { id: newHospital._id, name, walletAddress, email, phone, city },
    });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
});

// =====================================================================
// 🔐 LOGIN HOSPITAL
// =====================================================================
router.post("/hospital/login", async (req, res) => {
  try {
    const { walletAddress, password, privateKey } = req.body;

    if (!walletAddress || !password || !privateKey) {
      return res.status(400).json({ msg: "Wallet address, password, and private key are required." });
    }

    const hospital = await Hospital.findOne({ walletAddress });
    if (!hospital) return res.status(404).json({ msg: "Hospital not found. Please register first." });

    const isPasswordValid = await bcrypt.compare(password, hospital.password);
    if (!isPasswordValid) return res.status(401).json({ msg: "Invalid password." });

    const contract = getContract(privateKey);
    const role = await contract.getRole(walletAddress);
    if (Number(role) !== 1) return res.status(400).json({ msg: "This wallet is not registered as a hospital on blockchain." });

    const token = jwt.sign({ id: hospital._id, walletAddress: hospital.walletAddress, name: hospital.name }, process.env.JWT_SECRET || "supersecretkey", { expiresIn: "1h" });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600000 })
      .status(200)
      .json({ success: true, msg: "Login successful ✅", hospital: { id: hospital._id, name: hospital.name, walletAddress: hospital.walletAddress, email: hospital.email, phone: hospital.phone, city: hospital.city } });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ msg: "Login failed", error: error.message });
  }
});

// =====================================================================
// 👨‍⚕️ REGISTER DOCTOR
// =====================================================================
router.post("/doctor/register", requireHospitalAuth, async (req, res) => {
  try {
    const { name, walletAddress, email, phone, specialization, licenseId, password, privateKey } = req.body;

    if (!name || !walletAddress || !email || !phone || !specialization || !licenseId || !password || !privateKey)
      return res.status(400).json({ msg: "All required fields must be provided." });

    if (!ethers.utils.isAddress(walletAddress)) return res.status(400).json({ msg: "Invalid doctor wallet address format." });

    const existing = await Doctor.findOne({ walletAddress });
    if (existing) return res.status(400).json({ msg: "Doctor wallet already registered." });

    const contract = getContract(req.hospital.privateKey);
    const tx = await contract.registerDoctor(walletAddress);
    await tx.wait();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
      name,
      walletAddress,
      email,
      phone,
      specialization,
      licenseId,
      password: hashedPassword,
      privateKey,
      hospital: req.hospital._id,
      hospitalName: req.hospital.name,
      txHash: tx.hash,
    });

    await newDoctor.save();

    res.status(201).json({
      success: true,
      msg: "✅ Doctor registered successfully!",
      txHash: tx.hash,
      doctor: { id: newDoctor._id, name, walletAddress, email, phone, specialization, licenseId },
    });
  } catch (err) {
    console.error("❌ Doctor Registration Error:", err);
    res.status(500).json({ msg: "Doctor registration failed", error: err.message });
  }
});

// =====================================================================
// 🔐 LOGIN DOCTOR
// =====================================================================
// router.post("/doctor/login", async (req, res) => {
//   try {
//     const { walletAddress, password, privateKey } = req.body;

//     if (!walletAddress || !password || !privateKey) return res.status(400).json({ msg: "Wallet address, password, and private key are required." });

//     const doctor = await Doctor.findOne({ walletAddress });
//     if (!doctor) return res.status(404).json({ msg: "Doctor not found. Please register first." });

//     const isPasswordValid = await bcrypt.compare(password, doctor.password);
//     if (!isPasswordValid) return res.status(401).json({ msg: "Invalid password." });

//     const contract = getContract(privateKey);
//     const role = await contract.getRole(walletAddress);
//     if (Number(role) !== 2) return res.status(400).json({ msg: "This wallet is not registered as a doctor on blockchain." });

//     const token = jwt.sign({ id: doctor._id, walletAddress: doctor.walletAddress, name: doctor.name, hospital: doctor.hospital, hospitalName: doctor.hospitalName }, process.env.JWT_SECRET || "supersecretkey", { expiresIn: "1h" });

//     res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 3600000 })
//       .status(200)
//       .json({ success: true, msg: "Doctor login successful ✅", doctor: { id: doctor._id, name: doctor.name, walletAddress: doctor.walletAddress, email: doctor.email, phone: doctor.phone, hospitalName: doctor.hospitalName, specialization: doctor.specialization, licenseId: doctor.licenseId } });
//   } catch (error) {
//     console.error("❌ Doctor Login Error:", error);
//     res.status(500).json({ msg: "Doctor login failed", error: error.message });
//   }
// });

router.post("/doctor/login", async (req, res) => {
  try {
    const { walletAddress, password } = req.body;

    if (!walletAddress || !password) {
      return res
        .status(400)
        .json({ msg: "Wallet address and password are required." });
    }

    // --- Fetch doctor from DB ---
    const doctor = await Doctor.findOne({ walletAddress });
    if (!doctor) {
      return res
        .status(404)
        .json({ msg: "Doctor not found. Please register first." });
    }

    // --- Verify password ---
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password." });
    }

    // --- Blockchain role check using provider-only contract ---
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const identityContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      Identity.abi,
      provider
    );

    const walletAddressFixed = ethers.utils.getAddress(walletAddress);
    const role = await identityContract.getRole(walletAddressFixed);

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

    // --- Send response with cookie ---
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
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
    res.status(500).json({ msg: "Doctor login failed", error: error.message });
  }
});


// =====================================================================
// 👨‍⚕️ REGISTER PATIENT
// =====================================================================
router.post("/patient/register", requireDoctorAuth, async (req, res) => {
  try {
    const { name, walletAddress, email, phone, password, privateKey } = req.body;

    if (!name || !walletAddress || !email || !phone || !password || !privateKey) {
      return res.status(400).json({ msg: "All required fields must be provided." });
    }

    if (!ethers.utils.isAddress(walletAddress)) return res.status(400).json({ msg: "Invalid wallet address format." });

    const existing = await Patient.findOne({ walletAddress });
    if (existing) return res.status(400).json({ msg: "Patient wallet already registered." });

    const contract = getContract(req.doctor.privateKey);
    const tx = await contract.registerPatient(walletAddress);
    await tx.wait();

    const hashedPassword = await bcrypt.hash(password, 10);

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

    const token = jwt.sign({ id: newPatient._id, walletAddress: newPatient.walletAddress, name: newPatient.name, doctor: newPatient.doctor, doctorName: newPatient.doctorName }, process.env.JWT_SECRET || "supersecretkey", { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 3600000 })
      .status(201)
      .json({ success: true, msg: "✅ Patient registered successfully!", txHash: tx.hash, token, patient: { id: newPatient._id, name: newPatient.name, walletAddress: newPatient.walletAddress, email: newPatient.email, phone: newPatient.phone, doctorName: newPatient.doctorName } });
  } catch (err) {
    console.error("❌ Patient Registration Error:", err);
    res.status(500).json({ msg: "Patient registration failed", error: err.message });
  }
});

// =====================================================================
// 🔐 LOGIN PATIENT
// =====================================================================
// router.post("/patient/login", async (req, res) => {
//   try {
//     const { walletAddress, password, privateKey } = req.body;
//     if (!walletAddress || !password || !privateKey) return res.status(400).json({ msg: "All fields are required" });

//     const patient = await Patient.findOne({ walletAddress });
//     if (!patient) return res.status(404).json({ msg: "Patient not found. Please register first." });

//     const isPasswordValid = await bcrypt.compare(password, patient.password);
//     if (!isPasswordValid) return res.status(401).json({ msg: "Invalid password." });

//     const contract = getContract(privateKey);
//     const role = await contract.getRole(walletAddress);
//     if (Number(role) !== 3) return res.status(400).json({ msg: "This wallet is not registered as a patient on blockchain." });

//     const token = jwt.sign({ id: patient._id, walletAddress: patient.walletAddress, name: patient.name, doctor: patient.doctor, doctorName: patient.doctorName, role: 3 }, process.env.JWT_SECRET || "supersecretkey", { expiresIn: "1h" });

//     res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 3600000 })
//       .status(200)
//       .json({ success: true, msg: "Patient login successful", token, patient: { id: patient._id, name: patient.name, walletAddress: patient.walletAddress, email: patient.email, phone: patient.phone, doctorName: patient.doctorName } });
//   } catch (error) {
//     console.error("❌ Patient Login Error:", error);
//     res.status(500).json({ msg: "Patient login failed", error: error.message });
//   }
// });

router.post("/patient/login", async (req, res) => {
  try {
    const { walletAddress, password } = req.body;

    if (!walletAddress || !password) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    // --- Fetch patient from DB ---
    const patient = await Patient.findOne({ walletAddress });
    if (!patient) {
      return res.status(404).json({ msg: "Patient not found. Please register first." });
    }

    // --- Verify password ---
    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password." });
    }

    // --- Blockchain role check using provider-only contract ---
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const identityContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      Identity.abi,
      provider
    );

    const walletAddressFixed = ethers.utils.getAddress(walletAddress);
    const role = await identityContract.getRole(walletAddressFixed);

    if (Number(role) !== 3) {
      return res
        .status(400)
        .json({ msg: "This wallet is not registered as a patient on blockchain." });
    }

    // --- Generate JWT ---
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

    // --- Set cookie and respond ---
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(200)
      .json({
        success: true,
        msg: "Patient login successful ✅",
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
    console.error("❌ Patient Login Error:", error);
    res.status(500).json({ msg: "Patient login failed", error: error.message });
  }
});


module.exports = router;
