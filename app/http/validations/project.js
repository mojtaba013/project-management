const { body } = require("express-validator");

const createProjectValidator = () => {
  return [
    body("title").notEmpty().withMessage("عنوان نمیتواند خالی باشد"),
    body("tags").isArray({min:0,max:10}).withMessage("حداکثر تعداد هشتگ ده تا میباشد"),
    body("text")
      .notEmpty()
      .withMessage("توضیحات  نمیتواند خالی باشد"),
  ];
};

module.exports = {
  createProjectValidator,
};
