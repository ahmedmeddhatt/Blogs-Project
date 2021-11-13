const mongoose = require('mongoose');
const userSchema=require('../schema/user.schema.js')

const userModel= mongoose.model("user",userSchema)

module.exports=userModel