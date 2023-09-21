const { TeamController } = require("../http/controller/team.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { mongoIdValidator } = require("../http/validations/public");
const { createTeamValidator } = require("../http/validations/team");

const router = require("express").Router();
router.post(
  "/create",
  checkLogin,
  createTeamValidator(),
  expressValidatorMapper,
  TeamController.createTeam
);

router.get("/list", checkLogin, TeamController.getListOfTeam);
router.get("/me", checkLogin, TeamController.getMyTeams);

router.get(
  "/invite/:teamID/:username",
  checkLogin,
  TeamController.inviterUserToTeam
);

router.get(
  "/:id",
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  TeamController.getTeamById
);

router.delete(
  "/remove/:id",
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  TeamController.removeTeamById
);

module.exports = {
  teamRoutes: router,
};
