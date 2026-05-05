// const pdfparse = require("pdf-parse")
// const generateInterviewReport = require('../services/ai.service')
// const interviewReportModel = require('../models/interviewReport.model')



// async function generateViewReportController(req, res) {
//     const resumeContent = await (new pdfParse.PDFParse(req.file.buffer)).getText()
//     const { selfDescription, jobDescription } = req.body


//     const interviewReportByAi = await generateInterviewReport({
//         resume: resumeContent.text,
//         selfDescription,
//         jobDescription
//     })
//     const interviewReport = await interviewReportModel.create({
//         user: req.user.id,
//         resume: resumeContent.text,
//         selfDescription,
//         jobDescription,
//         ...interviewReportByAi
//     })
//     res.status(201)({
//         message: "interview report generated successfully",
//         interviewReport
//     })
// }
// module.exports = { generateViewReportController }

const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
    // const resumeContent = (new pdfParse.PDFParse(req.file.buffer)).getText()
    const pdfData = await pdfParse(req.file.buffer);
    const resumeContent = pdfData.text;

    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    });

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    });

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    });
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params
    const interviewReport = await interviewReportModel.findOne({
        _id: interviewId, user: req.user.id

    })
    if (!interviewReport) {
        return res.status(404).json({
            message: 'Interview report not fount.'
        })
    }
    res.status(200).json({
        message:"Interview report fetached successfully",
        interviewReport
    })

}

/**
 * @description Controller to get all interview reports of the user.
 */
async function getAllInterviewReportsController(req, res) {
const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select('-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillsGap -preparationPlan') 

    res.status(200).json({
        message: "All interview reports fetched successfully",
        interviewReports
    });
}
 
module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController
};