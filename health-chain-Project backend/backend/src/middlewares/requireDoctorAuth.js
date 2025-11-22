const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");

const requireDoctorAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);
    if (!token) return res.status(401).json({ error: "Missing auth token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
    const doctor = await Doctor.findById(decoded.id);
    if (!doctor) return res.status(401).json({ error: "Doctor not found" });

    req.doctor = doctor;
    next();
  } catch (err) {
    console.error("Doctor auth error:", err.message || err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = requireDoctorAuth;
