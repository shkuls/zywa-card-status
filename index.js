const connectDB = require("./DB/index");
const app = require("./app");
const DataUpdate  =require('./utils/dataUpdate')
const startCronJobs = require('./cron/cronJob')
const DBcleaner = require('./utils/DBcleaner')
const dotenv = require('dotenv');
dotenv.config({
    path: "./.env",
});

connectDB("mainDB")
    .then(async () => {
        startCronJobs();
        
        app.listen(8000, async () => {
            await DataUpdate();
            console.log("Server Running on port 8000")
        });
        
        app.on("error", (err) => {
            console.log("Error in app connection ", err);
        });
    })
    .catch((err) => {
        console.log("Error connecting to DB", err);
    });
