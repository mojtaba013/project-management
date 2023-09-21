const { userModel } = require("../../models/user");
const { createLinkForFiles } = require("../../modules/functions");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      user.profileImage = createLinkForFiles(user.profileImage, req);
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async editProfile(req, res, next) {
    try {
      let data = req.body;
      const userID = req.user._id;
      console.log(userID);
      let fields = ["firstName", "lastName", "skill"];
      let badValues = ["", " ", null, undefined, 0, -1, NaN, [], {}];
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
      });
      const result = await userModel.updateOne({ _id: userID }, { $set: data });
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          success: true,
          message: "به روز رسانی با موفقیت انجام شد",
        });
      }
      throw { status: 400, message: "آپدیت انجام نشد" };
    } catch (error) {
      next(error);
    }
  }

  async uploadProfileImage(req, res, next) {
    try {
      const userID = req.user._id;
      const filePath = req.file?.path?.substring(7);
      const result = await userModel.updateOne(
        { _id: userID },
        { $set: { profileImage: filePath } }
      );
      if (result.modifiedCount === 0)
        throw { status: 400, message: "آپدیت انجام نشد" };
      return res.status(200).json({ message: "با موفقیت آپدیت شد" });
      //console.log(req.file);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
  addSkills() {}
  editSkills() {}
  acceptInviteInTeam() {}
  rejectInviteInTeam() {}
}

module.exports = {
  UserController: new UserController(),
};
