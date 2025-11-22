const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String },
    metadata: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema);
