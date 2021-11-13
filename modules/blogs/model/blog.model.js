const mongoose = require('mongoose');
const blogSchema=require('../schema/blog.schema.js')

const blogModel= mongoose.model("Blogs",blogSchema)

module.exports=blogModel