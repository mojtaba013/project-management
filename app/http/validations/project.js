const { body } = require("express-validator");

const createProjectValidator = () => {
  return [
    body("title").notEmpty().withMessage("عنوان نمیتواند خالی باشد"),
    body("text")
      .notEmpty()
      .withMessage("توضیحات  نمیتواند خالی باشد"),
  ];
};

module.exports = {
  createProjectValidator,
};
