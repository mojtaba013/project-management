const fileupload = require("express-fileupload");
const { createUploadPath } = require("./functions");
const path = require("path");
const uploadfile = async (req, res, next) => {
  try {
    fileupload();
    if (req.file || Object.keys(req.files).length == 0)
      throw { status: 400, message: "تصویر پروژه را ارسال کنید" };
    let image = req.files.image;
    const imagePath = path.join(
      createUploadPath(),
      Date.now + path.extname(image.name)
    );
    req.body.image = imagePath;
    let uploadpath = path.join(__dirname, "..", "..", imagePath);
    image.mv(uploadpath, (err) => {
      if (err) throw { status: 400, message: "بارگذاری تصویر انجام نشد" };
      next();
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  uploadfile,
};
