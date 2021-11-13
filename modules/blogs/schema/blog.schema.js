const mongoose = require('mongoose');

const blogSchema= new mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    blogImgUrl:{type:String}
})

module.exports=blogSchema