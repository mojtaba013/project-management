const { body, param } = require("express-validator");
const { TeamModel } = require("../../models/team");

const createTeamValidator = () => {
  return [
    body("name").notEmpty().withMessage("نام تیم را وارد کنید"),
    body("description").notEmpty().withMessage("توضیحات تیم را وارد کنید"),
    body("username").custom(async (username) => {
      const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim;
      if (usernameRegex.test(username)) {
        const team = await TeamModel.findOne({ username });
        if (team) throw "نام کاربری قبلا توسط تیم دیگری استفاده شده است";
        return true;
      }
      throw "نام کاربری را بطور صحیح وارد کنید";
    }),
  ];
};

async function inviteToTeam() {
  return [param("teamID").custom((teamID, { req }) => {
    
  }),
  param("username").custom(username=>{

  })
];
}

module.exports = {
  createTeamValidator,
};
