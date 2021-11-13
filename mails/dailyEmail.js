var cron = require('node-cron');

const dailyEmail=()=>{
    cron.schedule(" * */24 * * *", () => {
        console.log("running a task every Day");
      });
    
}

module.exports=dailyEmail