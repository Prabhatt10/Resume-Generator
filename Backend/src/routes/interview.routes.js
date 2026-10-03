const express = require("express");

const interviewRouter = express.Router();

const authMiddleware = require("../middleware/auth.middleware.js");
const interviewController = require("../controller/interview.controller.js");
const upload = require("../middleware/file.middleware.js");

interviewRouter.post(
    "/report",
    authMiddleware.authUser,
    upload.single("resume"),
    interviewController.generateInterviewReportController
);

interviewRouter.get(
    "/report/:interviewId",
    authMiddleware.authUser,
    interviewController.getInterviewReportByIdContentController
);

interviewRouter.get(
    "/",
    authMiddleware.authUser,
    interviewController.getAllInterviewReportController
);

interviewRouter.post(
    "/resume/pdf/:interviewReportId",
    authMiddleware.authUser,
    interviewController.generateResumePDFController
);

module.exports = interviewRouter;