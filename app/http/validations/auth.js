const { body } = require("express-validator");
const { userModel } = require("../../models/user");
function registerValidator() {
  return [
    body("username").custom(async (value, ctx) => {
      if (value) {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
        if (usernameRegex.test(value)) {
          const user = await userModel.findOne({ username: value });
          if (user) throw "نام کاربری تکراری میباشد";
          return true;
        }
        throw "نام کاربری صحیح نمی باشد";
      } else throw "نام کاربری نمی تواند خالی باشد";
    }),
    body("email")
      .isEmail()
      .withMessage("ایمیل معتبر نمی باشد")
      .custom(async (email) => {
        const user = await userModel.findOne({ email });
        if (user) throw "ایمیل قبلا ثبت شده است";
        return true;
      }),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("شماره موبایل وارد شده صحیح نمی باشد")
      .custom(async (mobile) => {
        const user = await userModel.findOne({ mobile });
        if (user) throw "شماره موبایل قبلا ثبت شده است";
        return true;
      }),
    body("password").custom((value, ctx) => {
      if (!value) throw "رمز عبور نمیتواند خالی باشد";
      if (value !== ctx?.req?.body?.confirm_password)
        throw "رمز عبور با تکرار آن یکسان نمی باشد";
      return true;
    }),
  ];
}

function loginValidation() {
  return [
    body("username")
      .notEmpty()
      .withMessage("نام کاربری را وارد کنید")
      .custom((username) => {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
        if (usernameRegex.test(username)) {
          return true;
        }
        throw "نام کاربری صحیح نمی باشد";
      }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("رمز عبور باید حداقل 6 و حداکثر 16 کاراکتر باشد"),
  ];
}

module.exports = {
  registerValidator,
  loginValidation,
};
