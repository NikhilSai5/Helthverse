const express = require("express");
const router = express.Router();
const Prescription = require("../models/prescriptionSchema");

router.post("/store", async (req, res) => {
  try {
    const { image, date, medicines, hospital, userEmail } = req.body;

    // Basic validation
    if (!image || !medicines || !userEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPrescription = new Prescription({
      image,
      date: date || new Date(), // If not provided, use current date
      medicines,
      hospital,
      userEmail,
    });

    const savedPrescription = await newPrescription.save();
    res.status(201).json(savedPrescription);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/fetch-by-email", async (req, res) => {
  try {
    const { userEmail } = req.body;

    // Validate email input
    if (!userEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find all prescriptions matching the email
    const prescriptions = await Prescription.find({ userEmail });

    // Check if any prescriptions were found
    if (prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this email" });
    }

    // Return the prescriptions
    res.status(200).json(prescriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
