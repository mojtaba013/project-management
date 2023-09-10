const authController = require("../http/controller/auth.controller");
const { expressValidatorMapper } = require("../http/middlewares/CheckErrors");
const { registerValidator } = require("../http/validations/auth");

const router = require("express").Router();
router.post(
  "/register",
  registerValidator(),
  expressValidatorMapper,
  authController.AuthController.register
);
module.exports = {
  authRoutes: router,
};
