const app = require('express').Router()
const {allBlogs,addBlogs,upBlogs,delBlogs}=require('../controller/blog.controller.js')
const validator=require('../../../validator/validator.js')
const {addNewBlog}=require('../joi/blog.joi.js')
const auth=require("../../../config/auth.js")
const { GET_ALL_USER,DELETE_USER,ADD_BLOG } = require('../../../endPoints.js')
const path=require('path')
const multer  = require('multer')

function fileFilter (req, file, cb) {
if(file.mimetype=="image/jpeg"||file.mimetype=="image/png"){
    cb(null, true)
}else{    
    cb(null, false)
}
  }

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        const perfix= file.fieldname+"_"+Date.now()+"_"+path.extname(file.originalname)
        cb(null,perfix)
    }
})
const upload=multer({storage:storage,fileFilter:fileFilter})

app.get("/allBlogs",allBlogs)
app.post("/addBlogs",validator(addNewBlog),upload.single("img"),auth(ADD_BLOG),addBlogs)
app.put("/upBlogs/:id",upBlogs)
app.delete("/delBlogs/:id",delBlogs)

module.exports=app