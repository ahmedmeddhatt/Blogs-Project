const { StatusCodes } = require('http-status-codes');
const jwt=require('jsonwebtoken')
const rbac=require('../rbac/rbac.js')


module.exports=(endPoints)=>{
    return async (req,res,next)=>{
        let token= req.header("Authorization");
        if(token === undefined){
            console.log(token,"req.header2");
            console.log(token ,"token");
            return res.status(403).json({"error":"token is not valid"})
        }
        if (token.startsWith('Bearer')){
            token = token.slice(7, token.length)
        }
        console.log(token,"tokennn here");
        if(token){
             jwt.verify(token, 'myToken',(err,decoded)=>{
                    if(err){
                        return res.json({ success:false , message: 'token is wrong'}).status(StatusCodes.BAD_REQUEST)
                    }else{
                        const isAllowed=rbac.can(decoded.role,endPoints)
                        console.log("isAllowed",isAllowed);;
                        req.user=decoded;
                        console.log("decoded",decoded);
                        console.log("endPoints",endPoints);
                        if(isAllowed){
                            next()
                        }else{
                            res.status(StatusCodes.UNAUTHORIZED).json({message:"UNAUTHORIZED"})
                        }
        
                    }
                });
        }        ;



    }
}