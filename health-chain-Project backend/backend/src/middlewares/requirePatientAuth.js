const jwt = require("jsonwebtoken");

const requirePatientAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized. Login first." });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");

    // Check for patient role (role = 3)
    if (!decoded || decoded.role !== 3) {
      return res.status(403).json({ error: "Access denied: Only patients allowed" });
    }

    req.patient = decoded; // attach patient details from token

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }

};

module.exports = requirePatientAuth;
