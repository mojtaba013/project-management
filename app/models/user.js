const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    roles: { type: [String], default: ["USER"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skill: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
