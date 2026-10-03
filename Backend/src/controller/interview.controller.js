const { PDFParse } = require("pdf-parse");

const { generateInterviewReport, generateResumePDF } = require("../services/ai.service");
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


async function getInterviewReportByIdContentController(req, res) {
    try {

        // IMPORTANT: route uses :interviewId
        const { interviewId } = req.params;

        console.log("Fetching interview report:", interviewId);

        // Find report by ID
        const interviewReport =
            await interviewReportModel.findById(interviewId);

        if (!interviewReport) {
            return res.status(404).json({
                status: "error",
                message: "Interview report not found"
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                interviewReport
            }
        });

    } catch (error) {
        console.error(
            "Error fetching interview report:",
            error
        );

        return res.status(500).json({
            status: "error",
            message: "Failed to fetch interview report",
            error: error.message
        });
    }
}


async function getAllInterviewReportController(req, res) {
    try {

        const interviewReports =
            await interviewReportModel
                .find({ user: req.user.id })
                .sort({ createdAt: -1 })
                .select("title -_id");

        if (!interviewReports || interviewReports.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No interview reports found"
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                interviewReports
            }
        });

    } catch (error) {
        console.error(
            "Error fetching interview reports:",
            error
        );

        return res.status(500).json({
            status: "error",
            message: "Failed to fetch interview reports",
            error: error.message
        });
    }
}


async function generateResumePDFController(req, res) {
    try {
        const { interviewReportId } = req.params;

        const interviewReport = await interviewReportModel.findById(interviewReportId);

        if(!interviewReport) {
            return res.status(404).json({
                success : false,
                message : "Interview Report Not found"
            })
        }

        const {resume, jobDescription, selfDescription} = interviewReport;

        const pdfBuffer = await generateResumePDF({resume, jobDescription, selfDescription})

        res.set({
            "content-Type" : "application/pdf",
            "content_Disposition" : `attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : " Error in generate Resume PDF controller"
        })
    }
}


module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdContentController,
    getAllInterviewReportController,
    generateResumePDFController
};