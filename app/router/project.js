const fileUpload = require("express-fileupload");
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
router.get("/list", checkLogin, ProjectController.getAllProject);
router.get(
  "/:id",
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.getProjectById
);
router.delete(
  "/remove/:id",
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.removeProject
);
router.put(
  "/edit/:id",
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.updateProject
);
router.patch(
  "/edit-projectImage/:id",
  fileUpload(),
  checkLogin,
  uploadfile,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.updateProjectImage
);
module.exports = {
  projectRoutes: router,
};
