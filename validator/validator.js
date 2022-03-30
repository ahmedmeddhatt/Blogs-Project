const {StatusCodes, getReasonPhrase}=require('http-status-codes')

module.exports=(schema)=>{
    return (req,res,next)=>{
        var valid=[]
        var validationResult= schema.body.validate(req.body);
        if(validationResult.error){
            console.log("error1")
            valid.push(validationResult.error.details[0].message)
        }
        if(valid.length){
              console.log("error2")

            res.status(StatusCodes.BAD_REQUEST)
            res.json({message:valid.join(),code:getReasonPhrase(StatusCodes.BAD_REQUEST)})
        }
        next();
        return;
    }
}