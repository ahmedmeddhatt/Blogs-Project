const joi=require("joi")


module.exports={
    addNewUser:{
        body:joi.object().required().keys({
            uName:joi.string().required(),
            email:joi.string().email().required(),
            pass:joi.string().required(),
            cpass:joi.string().required(),
            location:joi.string().required(),
            phone:joi.number().required(),
            role:joi.string(),
            isAuth:joi.boolean()
        })
    },
    signInJoi:{
        body:joi.object().required().keys({
            email:joi.string().email().required(),
            pass:joi.string().required()
        })
    }
}