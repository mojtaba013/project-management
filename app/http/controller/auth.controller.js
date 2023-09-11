const { validationResult } = require("express-validator");
const {
  expressValidatorsMapper,
  hashString,
} = require("../../modules/functions");
const { userModel } = require("../../models/user");

class AuthController {
  async register(req, res, next) {
    try {
      const { username, password, email, mobile } = req.body;
      const hash_password = hashString(password);
      const user = await userModel.create({
        username,
        password: hash_password,
        email,
        mobile,
      });
      return res.json(user);
    } catch (error) {
      console.log(error);
      //next(error);
    }
  }

  login() {}

  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
