const mongoose = require("mongoose");
const InviteRequest = new mongoose.Schema({
  teamId: {type:mongoose.Types.ObjectId,require:true},
  caller:{type:String,required:true},
  requestDate:{type:Date,default:new Date()},
  status:{type:String,default:"pending"}

});

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    roles: { type: [String], default: ["USER"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false },
    skill: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: "" },
    inviteRequests : {type : [InviteRequest]}
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
