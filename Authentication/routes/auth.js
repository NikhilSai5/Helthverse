import bcrypt from "bcryptjs"; // Import bcrypt to hash passwords
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/user.model.js"; // Note the `.js` extension
const upload = multer();
const router = express.Router();

// Signup Route
router.post("/signup", upload.single("profilePic"), async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    bloodType,
    age,
    weight,
    height,
    bodyFat,
  } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Create a new user instance
    const user = new User({
      name,
      email,
      password,
      phone,
      bloodType,
      age,
      weight,
      height,
      bodyFat,
    });

    if (req.file) {
      user.profilePic.data = req.file.buffer;
      user.profilePic.contentType = req.file.mimetype;
    }

    // Save the user, allowing the schema to hash the password
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Error creating user" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // Compare provided password with hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Create and send JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Server error" });
  }
});

// GET /api/auth/profile - Search by email if provided
router.get("/profile", async (req, res) => {
  try {
    const { userId } = req.query; // Expect userId as an email in this case
    if (!userId) {
      return res.status(400).json({ message: "User ID (email) is required" });
    }

    const user = await User.findOne({ email: userId });
    if (user) {
      let profilePic = null;
      if (user.profilePic && user.profilePic.data) {
        profilePic = {
          data: user.profilePic.data.toString("base64"),
          contentType: user.profilePic.contentType,
        };
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bloodType: user.bloodType,
        age: user.age,
        weight: user.weight,
        height: user.height,
        profilePic,
        // selectedPlan: user.selectedPlan,
        // dietPreferences: user.dietPreferences,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/auth/profile - Update by email if provided
router.put("/profile", upload.single("profilePic"), async (req, res) => {
  try {
    const { userId } = req.query; // Expect userId as an email in this case
    if (!userId) {
      return res.status(400).json({ message: "User ID (email) is required" });
    }

    const user = await User.findOne({ email: userId });
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.bloodType = req.body.bloodType || user.bloodType;
      user.age = req.body.age || user.age;
      user.weight = req.body.weight || user.weight;
      user.height = req.body.height || user.height;

      if (req.file) {
        user.profilePic.data = req.file.buffer;
        user.profilePic.contentType = req.file.mimetype;
      }

      const updatedUser = await user.save();

      let profilePic = null;
      if (updatedUser.profilePic && updatedUser.profilePic.data) {
        profilePic = {
          data: updatedUser.profilePic.data.toString("base64"),
          contentType: updatedUser.profilePic.contentType,
        };
      }

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        bloodType: updatedUser.bloodType,
        age: updatedUser.age,
        weight: updatedUser.weight,
        height: updatedUser.height,
        profilePic,
        // selectedPlan: updatedUser.selectedPlan,
        // dietPreferences: updatedUser.dietPreferences,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
