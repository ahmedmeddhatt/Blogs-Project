const joi=require("joi")


module.exports={
    addNewBlog:{
        body:joi.object().required().keys({
            title:joi.string(),
            desc:joi.string(),
            blogImgUrl:joi.string()
        })
    }
}