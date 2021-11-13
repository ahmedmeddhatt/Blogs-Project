const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { boolean } = require('joi');

const userSchema= new mongoose.Schema({
    uName:{type:String,required:true},
    email:{type:String ,required:true},
    pass:{type:String,required:true,
    min:[5,'TOO SHORT !!']},
    cpass:{type:String,required:true},
    phone:{type:String,required:true},
    location:{type:String,required:true},
    role:String,
    isAuth:Boolean,
    userId:mongoose.Schema.Types.ObjectId
})


userSchema.pre("save",async function (next){
    this.pass= await bcrypt.hash(this.pass,7)
    this.cpass= await bcrypt.hash(this.cpass,7)
    next()
})



module.exports=userSchema