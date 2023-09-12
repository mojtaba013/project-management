class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  editProfile() {}
  addSkills() {}
  editSkills() {}
  acceptInviteInTeam() {}
  rejectInviteInTeam() {}
}
module.exports = {
  UserController: new UserController(),
};
