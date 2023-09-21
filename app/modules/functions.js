const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

function hashString(str) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "3 days",
  });
  return token;
}

function verifyjwtToken(token) {
  const result = jwt.verify(token, process.env.SECRET_KEY);
  if (!result?.username) throw "لطفا وارد حساب کاربری خود شوید";
  return result;
}

function createUploadPath() {
  let d = new Date();
  const Year = d.getFullYear() + "";
  const Month = d.getMonth() + "";
  const day = d.getDate() + "";
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "upload",
    Year,
    Month,
    day
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "upload", Year, Month, day);
}

function createLinkForFiles(fileaddress,req) {
  return (
    req.protocol +
    "://" +
    req.get("host") +
    "/" +
    fileaddress.replace(/[\\\\]/gm, "/")
  );
}

module.exports = {
  hashString,
  tokenGenerator,
  verifyjwtToken,
  createUploadPath,
  createLinkForFiles
};
