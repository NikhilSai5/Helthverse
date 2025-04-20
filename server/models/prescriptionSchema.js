const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: false,
  },
  duration: {
    type: String,
    required: true,
  },
});

const PrescriptionSchema = new mongoose.Schema({
  image: {
    type: String, // URL or path to the image
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  medicines: {
    type: [MedicineSchema],
    required: true,
  },
  hospital: {
    type: String,
    required: false,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
