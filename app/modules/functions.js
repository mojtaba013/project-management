const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
module.exports = {
  hashString,
  tokenGenerator,
  verifyjwtToken,
};
