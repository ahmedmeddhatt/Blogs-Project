const user=require('../model/user.model.js')
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


const allUsers=async(req,res)=>{
    let{page,size}=req.query;
    if(!page){page=1};
    if(!size){size=5};
    const limit=parseInt(size);
    const skip=(page-1)*size;
    const totalResult=await user.count()
    const totalPages=Math.ceil(totalResult/limit);

    let data= await user.findOne({email:req.user.email}).select("-pass").limit(limit).skip(skip)
    res.json({message:"all",page,size,totalResult,totalPages,data})
}

const addUsers=async(req,res)=>{
    let {uName,email,pass,cpass,phone,location , role}=req.body
    try{
        const checkUser=await user.findOne({email:email})
        if(checkUser){
            res.status(StatusCodes.BAD_REQUEST).json({message:"Email Alredy Registered"})      
         }else{

        const newUser=new user({uName:uName,email:email,pass:`${pass}`,cpass:`${cpass}`,phone:phone,role:role,location:location,isAuth:false})
        if(pass===cpass){
            await newUser.save()
            let transporter = nodemailer.createTransport({
                service:"gmail",
                 auth: {
                  user: 'ahmedmedhat1231@gmail.com', // generated ethereal user
                  pass: 'Nothing matters0', // generated ethereal password
                },
              }); 
              let token= jwt.sign({email} , 'myToken')
            let maill={
                from: '"tsetttttttttttt 👻" <ahmedmedhat1231@gmail.com>', // sender address
                to: "wijojap378@datakop.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?kn", // plain text body
                html: `  to verify this message please <a href='http://localhost:5000/verifyUser?token=${token}' target='_blank'>click here</a>  `, // html body
              }
              transporter.sendMail(maill, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            ;
            res.status(StatusCodes.OK).send("Added")  
            console.log("yesssssssss");

        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"NOT SAME PASSWORD"})      
        }
        
    }}catch(error){
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Something Went Wrong .."})
}}

const verifyUser=async(req,res)=>{
    let{token}=req.query
    let emailDecoded=jwt.verify(token,'myToken')
    let userEmail=await user.findOne({email:emailDecoded.email})
    console.log(userEmail,"okkk");
    if(userEmail){
        await user.updateOne({email:emailDecoded.email},{isAuth:true})
        res.send("verified")
    }else{
        res.status(StatusCodes.BAD_REQUEST).json({message:"not allowed to continue .."})
    }

}


const login=async(req,res)=>{
    const{email,pass}=req.body
    try{
        const checkEmail= await user.findOne({email:email})
        if(checkEmail){
            const match = await bcrypt.compare(pass, checkEmail.pass);

            if(match) {
                let token= jwt.sign({role:checkEmail.role, email: checkEmail.email,_id:checkEmail._id } , 'myToken')
                res.status(StatusCodes.OK).json({message:"LOGIN",token})

            }else   {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({message:"PASSWORD INCORRECT"})
            }}else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"EMAIL NOT FOUND"})

            }console.log(checkEmail,'data');
    }catch (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    }
}




const upUsers=async(req,res)=>{
    const {uName,email,pass,cpass,phone,location}=req.body;
    const _id=req.params.id;
    await user.updateOne({_id},{uName,email,pass,cpass,phone,location}).then(()=>{
        res.send("updated")
    }).catch((err)=>{
        res.json({message:"erorr",err})
    })
}

const delUsers=async(req,res)=>{
    const {uName,email,pass,cpass,phone,location}=req.body;
    const delId=req.params.id;
    await user.deleteMany({delId},{uName,email,pass,cpass,phone,location}).then(()=>{
        res.send("deleted")
    }).catch((err)=>{
        res.json({message:"erorr",err})
    })}




module.exports={
    allUsers,
    addUsers,
    upUsers,
    delUsers,
    login,
    verifyUser
}
