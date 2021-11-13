const roles=require("../../enum/roles.js")
const adminPolicy=require("./adminPolicy.js")
const userPolicy=require("./userPolicy.js")

const options={
    [roles.ADMIN]:{
        can:adminPolicy
    },
    [roles.USER]:{
        can:userPolicy
    }
}

module.exports=options