const { ProjectModel } = require("../../models/project");

class ProjectController {
  async createProject(req, res, next) {
    try {
      const owner = req.user._id;
      const { title, text,image } = req.body;
      const result = await ProjectModel.create({ title, text, owner,image });
      if (!result) throw { status: 400, message: "افزودن پروژه انجام نشد" };
      return res
        .status(201)
        .json({ message: "ثبت پروژه جدید با موفقیت انجام شد" });
    } catch (error) {}
  }
  getAllProject() {}
  getProjectById() {}
  getAllProjetOfTeam() {}
  getProjectOfUser() {}
  updateProject() {}
  removeProject() {}
}

module.exports = {
  ProjectController: new ProjectController(),
};
