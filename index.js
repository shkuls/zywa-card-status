const connectDB = require("./DB/index");
const app = require("./app");
const dotenv = require('dotenv');
dotenv.config({
    path: "./.env",
});

connectDB("mainDB")
    .then(() => {
        app.listen(8000, () => {
            console.log("Express Server Running on port " + (process.env.PORT || 8000));
        });

        app.on("error", (err) => {
            console.log("Error in app connection ", err);
        });
    })
    .catch((err) => {
        console.log("Error connecting to DB", err);
    });
