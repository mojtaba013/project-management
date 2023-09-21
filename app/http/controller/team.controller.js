const { TeamModel } = require("../../models/team");
const { userModel } = require("../../models/user");
const autoBind = require("auto-bind");
class TeamController {
  constructor() {
    autoBind(this);
  }
  async createTeam(req, res, next) {
    try {
      const { name, username, description } = req.body;
      const owner = req.user._id;
      const team = await TeamModel.create({
        name,
        description,
        username,
        owner,
      });
      //console.log(team);
      if (!team) throw { status: 500, message: "تیم ایجاد نشد" };
      return res.status(201).json({
        message: "تیم با موفقیت ایجاد شد",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getListOfTeam(req, res, next) {
    try {
      const teams = await TeamModel.find({});
      return res.status(200).json({
        success: true,
        teams,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTeamById(req, res, next) {
    try {
      const teamID = req.params.id;
      const team = await TeamModel.findById(teamID);
      if (!team) throw { message: "تیم با این شناسه وجود ندارد" };
      return res.status(201).json({
        team,
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getMyTeams(req, res, next) {
    try {
      const userID = req.user._id;
      const teams = await TeamModel.find({
        $or: [{ owner: userID }, { user: userID }],
      });
      return res.status(200).json({
        succecc: true,
        teams,
      });
    } catch (error) {
      next(error);
    }
  }

  async findUserInTeam(teamID, userID) {
    const result = await TeamModel.findOne({
      $or: [{ owner: userID }, { users: userID }],
      _id: teamID,
    });
    return !!result;
  }

  async inviterUserToTeam(req,res,next) {
    try {
      const userID = req.user._id;
      const { username, teamID } = req.params;
      const team = await this.findUserInTeam(teamID, userID);
      if (!team) throw { message: "تیمی جهت دعوت کردن پیدا نشد" };
      const user = await userModel.findOne({ username });
      if (!user) throw { message: "کاربر مورد نظر جهت دعوت به تیم یافت نشد" };
      const userInvited = await this.findUserInTeam(teamID, user._id);
      if (userInvited)
        throw { message: "کاربر مورد نظر قبلا به تیم دعوت شده است" };
      const request = {
        caller: req.user.username,
        requestDate: new Date(),
        teamID,
        status: "pending",
      };
      const updateUserResult = await userModel.updateOne(
        { username },
        { $push: { inviteRequests: request } }
      );
      if(updateUserResult.modifiedCount===0)throw {message:"ثبت درخواست دعوت انجام نشد"}
      return  res.status(201).json({
        message:"ثبت درخواست با موفقیت انجام شد"
      })
    } catch (error) {
      next(error);
    }
  }

  async removeTeamById(req, res, next) {
    try {
      const teamID = req.params.id;
      const team = await TeamModel.findById(teamID);
      if (!team) throw { message: "تیم با این شناسه وجود ندارد" };
      const result = await TeamModel.deleteOne({ _id: teamID });
      if (result.deletedCount === 0) throw { message: "حذف نشد" };
      return res.status(200).json({
        succecc: true,
        message: "حذف شد",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  updateTeam() {}
}
module.exports = {
  TeamController: new TeamController(),
};
