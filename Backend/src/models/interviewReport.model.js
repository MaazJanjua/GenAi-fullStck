const mongoose = require('mongoose');
/**
 * 
 * - job description schema : String,
 * - resume text : String,
 * - Self description : String
 * 
 * 
 * - Score:Number
 * 
 * - Technical Questions : 
 *             [{
 *          question:"",
 *          intention:"",
 *          answer:""
 *                 }]
 * - Behaviour Questions : [
 * {
 *          question:"",
 *          intention:"",
 *          answer:""
 *                 }
 * ]
 * 
 * - Skills-Gap:[{
 *             skill:"",
 *             severity:{
 *             type:String,
 *             enum:['low','medium','high']
 *              }
 * }]
 * 
 * 
 * - Preparation-Plan:[{
 *        day:Number,
 *        focuse:String,
 *        tasks:[String ]
 * }]
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Technical questions is required']
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Technical questions is required']
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, {
    _id: false
})
const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, 'Skill is required']
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: [true, 'Severity is required']
    }
}, { _id: false })

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, 'Dat is required']
    },
    focus: {
        type: String,
        required: [true, 'Focuse is required']
    },
    tasks: [{
        type: String,
        required: [true, 'Tasks is required']
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, 'job description is required']
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillsGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: [true, 'Job title is required']
    }
}, {
    timestamps: true
})
const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema)
module.exports = interviewReportModel