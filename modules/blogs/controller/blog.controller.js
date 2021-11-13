const userModel = require('../../users/model/user.model.js')
const blog=require('../model/blog.model.js')


const allBlogs=async(req,res)=>{
    let{page,size}=req.query
    if(!page){page=1};
    if(!size){size=20};
    const limit=parseInt(size);
    const skip=(page-1)*size;
    const totalResult=await blog.count();
    const totalPages=Math.ceil(totalResult/limit);
    let data= await blog.find({}).limit(limit).skip(skip).populate("userId","email",userModel)
    res.json({message:"all",page,size,totalResult,totalPages,data})
}

const addBlogs=async(req,res)=>{
    console.log("------------",req.body);
    console.log("--path----",req.file.path);
    console.log("----user-----",req.user);
    let {title,desc}=req.body
    if(req.file== undefined){
        res.send("FILE IS NOT SUPPORTED")
    }else{
        console.log(req.file.mimetype);
        await blog.insertMany({title,desc,blogImgUrl:req.file.path}).then(()=>{
            res.send("added")
        }).catch((err) =>{
                res.json({message:"erorr",err})})
    
    }
   }

const upBlogs=async(req,res)=>{
    const {title,desc}=req.body;
    const _id=req.params.id;
    await blog.updateOne({_id},{title,desc}).then(()=>{
        res.send("updated")
    }).catch((err)=>{
        res.json({message:"erorr",err})
    })
}

const delBlogs=async(req,res)=>{
    const {title,desc}=req.body;
    const delId=req.params.id;
    await blog.deleteOne({delId},{title,desc}).then(()=>{
        res.send("deleted")
    }).catch((err)=>{
        res.json({message:"erorr",err})
    })}




module.exports={
    allBlogs,
    addBlogs,
    upBlogs,
    delBlogs
}
