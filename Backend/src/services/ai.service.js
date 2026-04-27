const { GoogleGenAI } = require('@google/genai')
const config = require('../config/config')
const { z } = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')

const ai = new GoogleGenAI({
    apiKey: config.GENAI_KEY
})

const qaSchema = z.object({
    question: z.string().describe(
        "Clear, concise interview question directly related to job requirements."
    ),
    intention:z.string().describe(
            'To evaluate the candidate`s knowledge of performence optimization and state management'
        ),
    answer: z.string().describe(
        "How to answer this question, what points to cover, what approach to take etc."
    )
});

const interviewReportSchema = z.object({


    matchScore: z.number().describe(
        "A score between 0 and 100 indicating how well the candidate`s profile matches the job description. total must equal the sum of all four categories."
    ),

    technicalQuestions: z.array(qaSchema).describe(
        "Relevant technical questions can be asked in the interview along with their intention and how to answer them with  strong answers."
    ),

    behavioralQuestions: z.array(qaSchema).describe(
        "Relevant behavioral questions that can be asked in the interview along with their intention and how to answer them with strong answers."
    ),

    skillsGap: z.array(z.object({
        skill: z.string().describe(
            "The skills which the canditate is lackiing."
        ),
        severity: z.enum(['low', 'medium', 'high']).describe(
            "The severity of this skill gap, i.e."
        )
    })).describe(
        "List of skill gaps in the candidate`s profile along with their severity"
    ),

    preparationPlan: z.array(z.object({
        day: z.number().describe(
            "The day number in the preparation plan, starting from 1, (e.g., 1, 2, 3...)."
        ),
        focuse: z.string().describe(
            "The main focuse of this day in the preparation plan, e.g data."
        ),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation")
    })).describe(
        "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively."
    ),

   
}).describe(
    "Generate a structured interview report based on resume and job description."
);



async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `
    Generate an interview report for a candidate with the following details:


             Resume: ${resume}
             Self Description: ${selfDescription}
             Job Description: ${jobDescription}
             1- Return matchScore from 0 to 100.
2- matchScore is REQUIRED.
Scoring Rules for matchScore:
- skillsMatch = 40%
- experienceRelevance = 30%
- toolsTechnologies = 20%
- educationOther = 10%
3-technicalQuestions REQUIRED.
Each technical question must be an object with:
- question
- intention
- answer

4- behaviouralQuestions REQUIRED.
Each behavioral question must be an object with:
- question
- intention
- answer
5- intention also required with  every question and answer
6:-Each question, intention, and answer should be on separate lines. For example, when the question ends, the intention should start on the next line, and when the intention ends, the answer should start on the next line.
7- skillsGap REQUIRED
8- preparationPlan REQUIRED in objects  like { DAY NO preparationPlan}, {day 2 preparationPlan} {day 3 preparationPlan},...
9- IMPORTANT RULE
10- give all response in  JSON format always 
    `

    const response = await ai.models.generateContent({
        // model: "gemini-2.5-flash-lite",
        model:"gemini-3-flash-preview",
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
            responseSchema: zodToJsonSchema(interviewReportSchema),
             
        }
    });

    // const report = interviewReportSchema.parse(JSON.parse(response.text));
    console.log(JSON.parse(response.text));

    // return report;
}
module.exports = generateInterviewReport;