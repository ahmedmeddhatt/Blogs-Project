var cron = require('node-cron');

const weeklyReport=()=>{
    cron.schedule(" * * */7 * *", () => {
        console.log("running a task every Week");
      });
    
}

module.exports=weeklyReport