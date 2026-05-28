const mongoose = require("mongoose");

async function databaseConnection(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Conncected to database");
    } catch (error) {
        console.log("Error in database connection!")
        console.log(error.message);
    }
}

module.exports = databaseConnection; 