const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    image: { type: String, default: "/public/uploads" },

    owner: { type: mongoose.Type.ObjectId, required: true },
    team: { type: mongoose.Type.ObjectId },
  },
  { timestamps: true }
);
const ProjectModel = mongoose.model("project", ProjectSchema);
module.exports = ProjectModel;
