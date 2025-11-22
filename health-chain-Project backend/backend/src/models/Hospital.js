const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hospitalSchema = new mongoose.Schema(
  {
    // --- Core Identity ---
    name: {
      type: String,
      required: [true, "Hospital name is required"],
      trim: true,
      minlength: [3, "Hospital name must be at least 3 characters long"],
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

    registrationId: {
      type: String,
      required: [true, "Registration ID is required"],
      unique: true,
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City name is required"],
      trim: true,
    },

    txHash: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);


// --- 🔑 JWT Token Generator ---
hospitalSchema.methods.getJwt = async function () {
  return jwt.sign(
    {
      id: this._id,
      walletAddress: this.walletAddress,
      name: this.name,
    },
    process.env.JWT_SECRET || "supersecretkey",
    { expiresIn: "1h" }
  );
};

//
// --- 🔐 Password Validator ---
hospitalSchema.methods.validatePassword = async function (userInputPassword) {
  return bcrypt.compare(userInputPassword, this.password);
};

module.exports = mongoose.model("Hospital", hospitalSchema);
