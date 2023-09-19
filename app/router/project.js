const { ProjectController } = require("../http/controller/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidator } = require("../http/validations/project");
const { uploadfile } = require("../modules/express-fileupload");
const fileupload=require('express-fileupload')
const router = require("express").Router();
router.post(
  "/create",
  fileupload(),
  checkLogin,
  uploadfile,
  createProjectValidator(),
  expressValidatorMapper,
  ProjectController.createProject
);
module.exports = {
  projectRoutes: router,
};
