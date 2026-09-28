const { PDFParse } = require("pdf-parse");

const {generateInterviewReport} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model.js");

async function generateInterviewReportController(req, res) {
    try {
        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({
                status: "error",
                message: "Resume file is required"
            });
        }

        const { selfDescription, jobDescription } = req.body;

        // Parse PDF
        const parser = new PDFParse({
            data: resumeFile.buffer
        });

        const result = await parser.getText();

        const resumeContent = result.text;

        await parser.destroy();

        console.log("Resume extracted successfully");

        // Generate interview report using AI
        const interviewReportByAI = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        });

        // Save report to database
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interviewReportByAI
        });

        return res.status(200).json({
            status: "success",
            data: {
                interviewReport
            }
        });

    } catch (error) {
        console.error("Error generating interview report:", error);

        return res.status(500).json({
            status: "error",
            message: "Failed to generate interview report",
            error: error.message
        });
    }
}

module.exports = {
    generateInterviewReportController
};