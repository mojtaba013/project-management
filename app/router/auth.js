const authController = require("../http/controller/auth.controller");
const { expressValidatorMapper } = require("../http/middlewares/CheckErrors");
const {
  registerValidator,
  loginValidation,
} = require("../http/validations/auth");

const router = require("express").Router();
router.post(
  "/register",
  registerValidator(),
  expressValidatorMapper,
  authController.AuthController.register
);
router.post(
  "/login",
  loginValidation(),
  expressValidatorMapper,
  authController.AuthController.login
);
module.exports = {
  authRoutes: router,
};
