require("dotenv").config();

const app = require("./src/app");
const databaseConnection = require('./src/config/database');
const invokeGeminiAI = require("./src/services/ai.service")

const PORT = process.env.PORT || 3000;

databaseConnection();
// invokeGeminiAI();

app.listen(PORT, () => {
    console.log(`server is started at port ${PORT}`);
});