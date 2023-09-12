const { validationResult } = require("express-validator");
const {
  expressValidatorsMapper,
  hashString,
  tokenGenerator,
} = require("../../modules/functions");
const bcrypt = require("bcrypt");
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

  async login(req, res, next) {
    try {
      //console.log(req.headers);
      const { username, password } = req.body;
      const user = await userModel.findOne({ username });
      if (!user)
        throw { status: 401, message: "نام کاربری یا رمز عبور اشتباه است" };
      const compareResult = bcrypt.compareSync(password, user.password);
      if (!compareResult)
        throw { status: 401, message: "نام کاربری یا رمز عبور اشتباه است" };
      const token = tokenGenerator({ username });
      user.token = token;
      user.save();
      return res.status(200).json({
        success: true,
        message: "شما با موفقیت وارد حساب کاربری شدید",
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
