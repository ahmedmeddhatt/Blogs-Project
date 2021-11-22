// const { StatusCodes } = require('http-status-codes');
// const jwt=require('jsonwebtoken')
// const rbac=require('../rbac/rbac.js')

//     module.exports=(endPoints)=>{
//         return async(req,res,next)=>{
//         let token=req.header("Authorization")
//         if(token === undefined){
//             console.log(token,"req.header1");
//             console.log(token ,"token");
//             return res.status(403).json({"error":"token is not valid"})
//         }
        // if (token.startsWith('Bearer')){
        //     token = token.slice(7, token.length)
        // }
        // if(token){
        //     jwt.verify(token, 'myToken',(err,decoded)=>{
        //             if(err){
        //                 return res.json({ success:false , message: 'token is wrong'}).status(StatusCodes.BAD_REQUEST)
        //             }else{
        //                 rbac.can(decoded.role,endPoints);
        //                 req.user=decoded;
        //                 next()
        
        //             }
        //         });
        // }







        // let token
        // token=bearerToken.split(7,token.length)
        // var decoded = jwt.verify(token, 'myToken',(err,decoded)=>{
        //     if(err){
        //         return res.json({ success:false , message: 'token is wrong'}).status(StatusCodes.BAD_REQUEST)
        //     }else{
        //         req.decoded=decoded;
        //         rbac.can(decoded.role,endd);
        //         next()

        //     }
        // });
        
        
        // // console.log(decoded,"decoded")
        // console.log(token,"token");;
        // const isAllowed=await rbac.can(decoded.role,endd)
        // console.log(isAllowed,"is");
        // req.user=decoded
        // console.log(req.user,"gh");
        // if(isAllowed){
            // next()
        // }else{
            // res.status(StatusCodes.UNAUTHORIZED).json({message:"UNAUTHORIZED"})
        // }
    //     }
    // }