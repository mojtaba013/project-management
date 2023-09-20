const { ProjectController } = require("../http/controller/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidator } = require("../http/validations/project");
const { mongoIdValidator } = require("../http/validations/public");
const { uploadfile } = require("../modules/express-fileupload");
const fileupload = require("express-fileupload");
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
router.post("/list", checkLogin, ProjectController.getAllProject);
router.post(
  "/:id",
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.getProjectById
);
router.post(
  "/remove/:id",
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.removeProject
);
router.post(
  "/edit/:id",
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.updateProject
);
module.exports = {
  projectRoutes: router,
};
