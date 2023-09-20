const { ProjectModel } = require("../../models/project");

class ProjectController {
  async createProject(req, res, next) {
    try {
      const owner = req.user._id;
      const { title, text,image ,tags} = req.body;
      const result = await ProjectModel.create({ title, text, owner,image,tags });
      if (!result) throw { status: 400, message: "افزودن پروژه انجام نشد" };
      return res
        .status(201)
        .json({ message: "ثبت پروژه جدید با موفقیت انجام شد" });
    } catch (error) {}
  }

  async getAllProject(req,res,next) {
    try {
      const owner=req.user._id
const projects=await ProjectModel.find({owner})
return res.status(200).json({
  success:true,
  projects
})
    } catch (error) {
      next(error)
    }
  }

  getProjectById() {}
  getAllProjetOfTeam() {}
  getProjectOfUser() {}
  updateProject() {}
  removeProject() {}
}

module.exports = {
  ProjectController: new ProjectController(),
};
