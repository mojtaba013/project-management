const mongoose = require("mongoose");
const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    users: { type: [mongoose.Type.ObjectId], default: [] },
    owner: { type: mongoose.Type.ObjectId, required: true },
  },
  { timestamps: true }
);
const TeamModel = mongoose.model("team", userSchema);
module.exports = TeamModel;
