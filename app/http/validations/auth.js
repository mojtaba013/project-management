const { body } = require("express-validator");
function registerValidator() {
  return [
    body("username").custom((value, ctx) => {
      if (value) {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
        if (usernameRegex.test(value)) return true;
        throw "نام کاربری صحیح نمی باشد";
      } else throw "نام کاربری نمی تواند خالی باشد";
    }),
    body("email").isEmail().withMessage("ایمیل معتبر نمی باشد"),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("شماره موبایل وارد شده صحیح نمی باشد"),
    body("password")      
      .custom((value, ctx) => {
        if (!value) throw "رمز عبور نمیتواند خالی باشد";
        if (value !== ctx?.req?.body?.confirm_password)
          throw "رمز عبور با تکرار آن یکسان نمی باشد";
        return true;
      }),
  ];
}

module.exports = {
  registerValidator,
};
