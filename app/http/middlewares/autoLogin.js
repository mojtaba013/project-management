const { verifyjwtToken } = require("../../modules/functions");
const { userModel } = require("../../models/user");

const checkLogin = async (req, res, next) => {
  try {
    let authError = { status: 401, message: "لطفا وارد حساب کاربری خود شوید" };
    const authorization = req?.headers?.authorization;
    if (!authorization) throw authError;
    let token = authorization.split(" ")?.[1];
    if (!token) throw authError;
    const result = verifyjwtToken(token);
    const { username } = result;
    const user = await userModel.findOne({ username }, { password: 0 });
    if (!user) throw authError;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports={
    checkLogin
}