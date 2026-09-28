require("dotenv").config();

const app = require("./src/app");
const databaseConnection = require('./src/config/database');
const invokeGeminiAI = require("./src/services/ai.service")
const { generateInterviewReport } = require("./src/services/ai.service")
const { resume, selfDescription, jobDescription } = require("./src/services/temp")


const PORT = process.env.PORT || 3000;

databaseConnection();
// invokeGeminiAI();
// generateInterviewReport({resume, selfDescription, jobDescription})

app.listen(PORT, () => {
    console.log(`server is started at port ${PORT}`);
});