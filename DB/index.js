const mongoose = require("mongoose")
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async (dbName) => {
    try {
        mongoose.connect('mongodb+srv://diy2903:PrX14p6X5lyhRpDJ@firstdb.ul9ws71.mongodb.net/?retryWrites=true&w=majority&appName=FirstDB')
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.log(err));

    }
    catch (err) {
        console.log("error connecting to DB host", err)
        process.exit(1);

    }
}

module.exports = connectDB;


