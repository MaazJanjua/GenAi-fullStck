const { GoogleGenAI } = require('@google/genai')
const config = require('../config/config.js')
const { z } = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')
// const interviewReportSchema = require('../models/interviewReport.model.js')
// const { describe } = require('zod/v4/core')


const ai = new GoogleGenAI({
    apiKey: config.GENAI_KEY
})

// const qaSchema = z.object({
//     question: z.string().describe(
//         "Clear, concise interview question directly related to job requirements."
//     ),
//     intention: z.string().describe(
//         'To evaluate the candidate`s knowledge of performence optimization and state management'
//     ),
//     answer: z.string().describe(
//         "How to answer this question, what points to cover, what approach to take etc."
//     )
// });

const interviewReportSchema = z.object({


    matchScore: z.number().describe(
        "A score between 0 and 100 indicating how well the candidate`s profile matches the job description. total must equal the sum of all four categories."
    ),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this technical question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    }))
        .min(3)
        .max(10)
        .describe(
            "Technical questions can be asked in the interview along with their intention and how to answer them with strong answers."
        ),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this technical question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    }))
        .min(3)
        .max(10)
        .describe(
            "Behavioral Questions questions can be asked in the interview along with their intention and how to answer them with strong answers."
        ),

    skillsGap: z.array(z.object({
        skill: z.string().describe(
            "The skills which the canditate is lackiing."
        ),
        severity: z.enum(['low', 'medium', 'high']).describe(
            "The severity of this skill gap, i.e."
        )
    }))
        .min(3)
        .max(8)
        .describe(
            "List of skill gaps in the candidate`s profile along with their severity"
        ),

    preparationPlan: z.array(z.object({
        day: z.number().describe(
            "The day number in the preparation plan, starting from 1, (e.g., 1, 2, 3...)."
        ),
        focus: z.string().describe(
            "The main focuse of this day in the preparation plan, e.g data."
        ),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation")
    }))
        .min(3)
        .max(10)
        .describe(
            "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively."
        ),
        title: z.string().describe(
            "The title of the job for which the interview report is generated."
        )

}).describe(
    "Generate a structured interview report based on resume and job description."
);

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `
Generate a STRICT JSON interview report.

Return ONLY valid JSON.

Required structure:

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillsGap": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": [string]
    }
  ]
}

Rules:
- Never return empty arrays
- Minimum 3 technical questions
- Minimum 3 behavioral questions
- Minimum 3 skills gaps
- Minimum 5 preparation plan days
- matchScore must be 0 to 100
- Return JSON only
- No markdown
- No explanation

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
        // model: "gemini-2.5-flash-lite",
        model: "gemini-2.5-flash-lite",
        // contents: [  
        //     {
        //         role: "user",
        //         parts: [
        //             { text: prompt }
        //         ]
        //     }
        // ],
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            // responseSchema: zodToJsonSchema(interviewReportSchema),

        }
    });

    // const parsedData = JSON.parse(response.text);
    // const report = interviewReportSchema.parse(parsedData);
    // console.log(JSON.parse(response.text));
    const parsedData = JSON.parse(response.text);
    // return parsedData
    // return JSON.parse(response.text);
    // return report
    console.log("RAW AI RESPONSE:");
    console.log(parsedData);

    const validatedReport = interviewReportSchema.parse(parsedData);

    return validatedReport;
}
module.exports = generateInterviewReport;