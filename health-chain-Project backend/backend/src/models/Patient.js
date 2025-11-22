const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const patientSchema = new mongoose.Schema(
  {
    // --- Core Identity ---
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
      minlength: [3, "Patient name must be at least 3 characters long"],
    },

    walletAddress: {
      type: String,
      required: [true, "Wallet address is required"],
      unique: true,
      lowercase: true,
      match: [/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address format"],
    },

    privateKey: {
      type: String,
      required: [true, "Private key is required"],
      minlength: [64, "Invalid private key format"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: true,
    },

    // --- Contact and Info ---
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9+\-\s]{7,15}$/, "Invalid phone number format"],
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Registering doctor is required"],
    },

    doctorName: {
      type: String,
      required: true,
      trim: true,
    },

    txHash: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Patient", patientSchema);