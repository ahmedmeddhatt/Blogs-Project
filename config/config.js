const mongoose = require('mongoose');
require('dotenv').config()


const connection =async ()=>{
    return await mongoose.connect(process.env.CONNECTION_STRING_DEOLOY,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=> console.log("MMONGO RUN"));

};
console.log(`${process.env.CONNECTION_STRING_DEOLOY} CONNECTION_STRING_DEOLOY`);
module.exports=connection