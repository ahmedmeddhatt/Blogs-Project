const { StatusCodes } = require('http-status-codes');
const jwt=require('jsonwebtoken')
const rbac=require('../rbac/rbac.js')
    module.exports=(endd)=>{
        return async(req,res,next)=>{
        let bearerToken=req.headers.authorization
        let token
        token=bearerToken.split(" ")[1]
        var decoded = jwt.verify(token, 'myToken');
        // console.log(decoded,"decoded")
        // console.log(token,"token");;
        const isAllowed=await rbac.can(decoded.role,endd)
        // console.log(isAllowed,"is");
        req.user=decoded
        // console.log(req.user,"gh");
        // if(isAllowed){
            next()
        // }else{
            // res.status(StatusCodes.UNAUTHORIZED).json({message:"UNAUTHORIZED"})
        // }
        }
    }