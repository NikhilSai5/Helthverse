// import express from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// const router = express.Router();

// // Utility function to verify token and extract user info
// const verifyToken = (token) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded;
//   } catch (error) {
//     return null;
//   }
// };

// // Route to get user details (for fetching current diet preferences)
// router.get("/profile", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token from the headers
//   console.log("GET /profile - Authorization token:", token); // Log the token for debugging

//   if (!token) {
//     console.log("No token found in the request headers.");
//     return res.status(401).send({ message: "Authorization token is required" });
//   }

//   const userData = verifyToken(token);
//   if (!userData) {
//     console.log("Invalid or expired token:", token);
//     return res.status(401).send({ message: "Invalid or expired token" });
//   }

//   const userId = userData._id;
//   console.log("User ID extracted from token:", userId);

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       console.log("User not found with ID:", userId);
//       return res.status(404).send({ message: "User not found" });
//     }

//     console.log("User profile fetched successfully:", user);
//     res.status(200).send({ user });
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     res.status(500).send({ message: "Server error" });
//   }
// });

// // Route to update diet preferences
// router.put("/update-diet-preferences", async (req, res) => {
//   const { lastWeight, targetWeight, dietaryPreference, workoutFrequency } = req.body;
//   console.log("PUT /update-diet-preferences - Request body:", req.body); // Log request body

//   const token = req.headers.authorization?.split(" ")[1];
//   console.log("Authorization token:", token); // Log the token

//   if (!token) {
//     console.log("No token found in the request headers.");
//     return res.status(401).send({ message: "Authorization token is required" });
//   }

//   const userData = verifyToken(token);
//   if (!userData) {
//     console.log("Invalid or expired token:", token);
//     return res.status(401).send({ message: "Invalid or expired token" });
//   }

//   const userId = userData._id;
//   console.log("User ID extracted from token:", userId);

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         $set: {
//           "dietPreferences.dietaryPreference": dietaryPreference,
//           "dietPreferences.lastWeight": lastWeight,
//           "dietPreferences.targetWeight": targetWeight,
//           "dietPreferences.workoutFrequency": workoutFrequency,
//         },
//       },
//       { new: true }
//     );

//     if (!updatedUser) {
//       console.log("User not found with ID:", userId);
//       return res.status(404).send({ message: "User not found" });
//     }

//     console.log("Diet preferences updated successfully:", updatedUser);
//     res.status(200).send({ message: "Diet preferences updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).send({ message: "Server error" });
//   }
// });

// export default router;
// user.js on port 5001
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const router = express.Router();

// Utility function to verify token and extract user info
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

// Route to update diet preferences
// Route to update diet preferences
router.put("/update-diet-preferences", async (req, res) => {
    const { lastWeight, targetWeight, dietaryPreference, workoutFrequency } = req.body;
  
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
    if (!token) {
      return res.status(401).send({ message: "Authorization token is required" });
    }
  
    const userData = verifyToken(token);
    if (!userData) {
      return res.status(401).send({ message: "Invalid or expired token" });
    }
  
    const userId = userData._id;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            "dietPreferences.dietaryPreference": dietaryPreference,
            "dietPreferences.lastWeight": lastWeight,
            "dietPreferences.targetWeight": targetWeight,
            "dietPreferences.workoutFrequency": workoutFrequency,
          },
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).send({ message: "User not found" });
      }
  
      res.status(200).send({
        message: "Diet preferences updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).send({ message: "Server error" });
    }
  });
  

export default router;
