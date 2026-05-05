# GenAi-fullStck
Gen ai + fullStack-Project




{1h:16m}


Production-Level AI Prompt Engineering










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
    intention: z.string().describe(
        "The intention of interviewer behind asking the questions."
    ),
    answer: z.string().describe(
        "How to answer this question, what points to cover, what approach to take etc."
    )
});

const interviewReportSchema = z.object({


    matchScore: z.object({
        total: z.coerce.number().min(0).max(100).describe(
            "Final total match score from 0 to 100."
        ),

        skillsMatch: z.coerce.number().min(0).max(40).describe(
            "Score for skills match only. Maximum 40 points."
        ),

        experienceRelevance: z.coerce.number().min(0).max(30).describe(
            "Score for relevant experience only. Maximum 30 points based on work experience relevance."
        ),

        toolsTechnologies: z.coerce.number().min(0).max(20).describe(
            "Score for tools and technologies match only. Maximum 20 points."
        ),

        educationOther: z.coerce.number().min(0).max(10).describe(
            "Score for education and additional factors only. Maximum 10 points."
        )
    }).describe(
        "Ascore between 0 and 100 indicating how well the candidate`s profile matches the job description. total must equal the sum of all four categories."
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
You are an expert technical interviewer.

Generate a structured interview report :


Important Rules:
- Do NOT assume missing information
- Do NOT hallucinate
- Return ONLY valid JSON
- matchScore is REQUIRED with scoreBreakdown REQUIRED
- Return scoreBreakdown as a JSON object.
- Do NOT return scoreBreakdown as an array of strings.

Scoring Rules for matchScore:
- skillsMatch = 40%
- experienceRelevance = 30%
- toolsTechnologies = 20%
- educationOther = 10%

Return matchScore from 0 to 100.
matchScore is REQUIRED.

matchScore must contain:
- total
- skillsMatch
- experienceRelevance
- toolsTechnologies
- educationOther

Return matchScore as a JSON object with numeric values only.

Example:
"matchScore": {
  "total": 80,
  "skillsMatch": 32,
  "experienceRelevance": 24,
  "toolsTechnologies": 16,
  "educationOther": 8
}

                         Resume: ${resume}
                         Self Description: ${selfDescription}
                         Job Description: ${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: [
            {
                role: "user",
                parts: [
                    { text: prompt }
                ]
            }
        ],
        // contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    });

    const report = interviewReportSchema.parse(JSON.parse(response.text));
    console.log(response.text);

    return report;
}
module.exports = generateInterviewReport;
















const prompt = `
You are an expert technical interviewer.

Return ONLY valid JSON.

STRICT RULES:
- No markdown
- No explanation
- No extra text
- No null values
- No missing fields
- Do NOT return arrays of strings where objects are required

technicalQuestions MUST be:

[
  {
    "question": "string",
    "intention": "string",
    "answer": "string"
  }
]

behavioralQuestions MUST be:

[
  {
    "question": "string",
    "intention": "string",
    "answer": "string"
  }
]

skillsGap MUST be:

[
  {
    "skill": "string",
    "severity": "low | medium | high"
  }
]

preparationPlan MUST be:

[
  {
    "day": 1,
    "focuse": "string",
    "tasks": ["task1", "task2"]
  }
]

matchScore MUST be:

{
  "total": number,
  "skillsMatch": number,
  "experienceRelevance": number,
  "toolsTechnologies": number,
  "educationOther": number
}

Do NOT create scoreBreakdown field.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;


last main yeah do requirment chori thi ai ko denay say 
3- technicalQuestions REQUIRED with provide intention and ANSWERS both with numbering like QUESTION NO # 1 ANSWER NO #1

4- behaviouralQuestions REQUIRED with provide intention and ANSWERS both with numbering like QUESTION NO # 1 ANSWER NO #1


3-technicalQuestions REQUIRED with provide intention and ANSWERS both with numbering like QUESTION NO # 1 ANSWER NO #1:
- question
- intention
- answer

4- behaviouralQuestions REQUIRED with provide intention and ANSWERS both with numbering like QUESTION NO # 1 ANSWER NO #1:
- question
- intention
- answer
5- intention also required with  every question and answer
6:-Each question, intention, and answer should be on separate lines. For example, when the question ends, the intention should start on the next line, and when the intention ends, the answer should start on the next line.






const interviewReportSchema = z.object({


    matchScore: z.number().describe(
        "A score between 0 and 100 indicating how well the candidate`s profile matches the job description. total must equal the sum of all four categories."
    ),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this technical question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(5).describe(
        "Technical questions can be asked in the interview along with their intention and how to answer them with  strong answers."
    ),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this technical question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe(
        "Behavioral Questions questions can be asked in the interview along with their intention and how to answer them with  strong answers."
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
        focus: z.string().describe(
            "The main focuse of this day in the preparation plan, e.g data."
        ),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation")
    })).describe(
        "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively."
    ),


}).describe(
    "Generate a structured interview report based on resume and job description."
);