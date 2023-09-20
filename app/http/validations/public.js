const { param } = require("express-validator")

const mongoIdValidator=()=>{
    return[
        param("id").isMongoId().withMessage("شناسه ارسال شده صحیح نمی باشد")
    ]
}

module.exports={
    mongoIdValidator
}