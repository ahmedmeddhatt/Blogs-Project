const express = require('express')
const app= express()
app.use(express.json())
require('dotenv').config()
const blogRoutes=require('./modules/blogs/routes/blog.routes.js')
const userRoutes=require('./modules/users/routes/user.routes.JS')
app.use(blogRoutes,userRoutes)
const connection=require('./config/config.js')
connection()
const path=require('path')
const mails=require('./mails/mail.index.js')
// mails()
const multer  = require('multer')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")
    },
    filename:function(req,file,cb){
        const perfix= file.fieldname+"_"+Date.now()+"_"+path.extname(file.originalname)
        cb(null,perfix)
    }
})
const upload=multer({storage:storage})


app.post("/image",upload.single("IMAGE"),(req,res)=>{
    console.log(req.file);
    res.send("okay")
})
app.get("/",(req,res)=>{
    cron.schedule("* * */1 * * *", () => {
        console.log("running a task every one minute");
      });
      res.send("donee")
})

console.log(process.env.PORT);
app.listen(5000,(req,res)=>{
    console.log(5000);
})
