// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   age: { type: Number, default: null },
//   weight: { type: Number, default: null },
//   height: { type: Number, default: null },

//   profilePic: {
//     data: { type: Buffer, default: null }, // Binary data of the image
//     contentType: { type: String, default: null }, // MIME type (e.g., "image/png", "image/jpeg")
//   },
// });

// // Hash the password before saving the user
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model("User", UserSchema);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: null },
  bloodType: { type: String, default: null },
  age: { type: Number, default: null },
  weight: { type: Number, default: null },
  height: { type: Number, default: null },

  profilePic: {
    data: { type: Buffer, default: null }, // Binary data of the image
    contentType: { type: String, default: null }, // MIME type (e.g., "image/png", "image/jpeg")
  },
});

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);
