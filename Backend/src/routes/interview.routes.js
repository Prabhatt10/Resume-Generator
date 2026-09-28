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

module.exports = interviewRouter;