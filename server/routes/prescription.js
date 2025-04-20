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

module.exports = router;
