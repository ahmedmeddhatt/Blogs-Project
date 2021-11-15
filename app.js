const path=require('path')
const express = require('express')
const multer  = require('multer')

const connection=require('./config/config.js')
const blogRoutes=require('./modules/blogs/routes/blog.routes.js')
const mails=require('./mails/mail.index.js')
const userRoutes=require('./modules/users/routes/user.routes.JS')
require('dotenv').config()

const app= express()
app.use(express.json())
app.use(blogRoutes)
app.use(userRoutes)

connection()

// mails()

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

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
