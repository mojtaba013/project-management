const fileupload = require("express-fileupload");
const { createUploadPath } = require("./functions");
const path = require("path");
const uploadfile = async (req, res, next) => {
  try {
    fileupload();
    if (req.file || Object.keys(req.files).length == 0)
      throw { status: 400, message: "تصویر پروژه را ارسال کنید" };
    let image = req.files.image;
    let type = path.extname(image.name);
    if (![".png", ".jpeg", ".jpg", ".webp", ".gif"].includes(type))
      throw { message: "فرمت ارسال شده صحیح نمی باشد" };
    const imagePath = path.join(
      createUploadPath(),
      Date.now() + type
    );
    req.body.image = imagePath.substring(7);
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
