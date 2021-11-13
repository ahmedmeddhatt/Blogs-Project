const dailyEmail=require('./dailyEmail')
const weeklyReport=require('./weeklyReport')

const mails=()=>{
    dailyEmail(),
    weeklyReport()
}


module.exports=mails