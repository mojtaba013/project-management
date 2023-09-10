const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    roles: { type: String, default: ["USER"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skill: { type: String, default: [] },
    teams: { type: String, default: [] },
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
