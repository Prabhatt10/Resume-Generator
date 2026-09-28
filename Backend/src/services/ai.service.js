const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const {
    resume,
    selfDescription,
    jobDescription
} = require("./temp");

const client = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
    httpOptions: {
        timeout: 60000
    }
});

// JSON Schema sent to Gemini
const interviewReportJsonSchema = {
    type: "object",

    properties: {
        matchScore: {
            type: "number",
            minimum: 0,
            maximum: 100,
            description:
                "Calculate the candidate's actual resume-to-job-description match percentage. Compare the candidate's skills, experience, projects, education and qualifications with the requirements in the job description. Do not return 0 unless there is genuinely no relevant match"
        },

        technicalQuestions: {
            type: "array",
            description:
                "Technical interview questions relevant to the candidate and job.",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string",
                        description:
                            "The technical question that can be asked in the interview."
                    },

                    intention: {
                        type: "string",
                        description:
                            "The intention behind asking the technical question."
                    },

                    answer: {
                        type: "string",
                        description:
                            "How to answer this question, what points to cover, what approach to take."
                    }
                },
                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        behaviouralQuestions: {
            type: "array",
            description:
                "Behavioural interview questions relevant to the candidate.",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string",
                        description:
                            "The behavioural question that can be asked in the interview."
                    },

                    intention: {
                        type: "string",
                        description:
                            "The intention behind asking the behavioural question."
                    },

                    answer: {
                        type: "string",
                        description:
                            "How to answer this question, what points to cover, what approach to take."
                    }
                },
                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        skillsGaps: {
            type: "array",
            description:
                "Skills the candidate is lacking or needs to improve.",
            items: {
                type: "object",
                properties: {
                    skill: {
                        type: "string",
                        description:
                            "The skill that the candidate is lacking or needs improvement in."
                    },

                    severity: {
                        type: "string",
                        enum: [
                            "low",
                            "medium",
                            "high"
                        ],
                        description:
                            "The severity of the skill gap."
                    }
                },
                required: [
                    "skill",
                    "severity"
                ]
            }
        },

        preparationPlan: {
            type: "array",
            description:
                "A detailed preparation plan for the candidate.",
            items: {
                type: "object",
                properties: {
                    day: {
                        type: "integer",
                        description:
                            "The day number of the preparation plan."
                    },

                    focus: {
                        type: "string",
                        description:
                            "The main focus or topic to be covered on that day."
                    },

                    tasks: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        description:
                            "A list of tasks to be completed on that day."
                    }
                },
                required: [
                    "day",
                    "focus",
                    "tasks"
                ]
            }
        }
    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behaviouralQuestions",
        "skillsGaps",
        "preparationPlan"
    ]
};


// Zod schema for validating Gemini's response
const interviewReportSchema = z.fromJSONSchema(
    interviewReportJsonSchema
);


async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    try {

        const prompt = `
        You are an expert technical interviewer and career advisor.

        Generate a detailed interview preparation report for the candidate.

        CANDIDATE RESUME:
        ${resume}

        CANDIDATE SELF DESCRIPTION:
        ${selfDescription}

        JOB DESCRIPTION:
        ${jobDescription}

        Analyze the candidate's resume and self-description against the job description.

        You MUST return all of the following:

        1. matchScore
        - Calculate a score from 0 to 100 by directly comparing the candidate's resume with the job description.
        - Match the candidate's skills, technologies, projects, experience, education and qualifications against the requirements of the job.
        - Give credit for every relevant skill or qualification present in the resume.
        - Give a lower score only when important job requirements are missing.
        - The score must represent the actual candidate-job match.
        - Do NOT return 0 simply because some information is missing.
        - Return 0 only if the candidate has essentially no relevant match with the job.

        2. technicalQuestions
        - Generate relevant technical interview questions.
        - Questions must be based on the candidate's skills, projects, experience,
          and the job description.
        - Include the intention behind each question.
        - Include guidance on how the candidate should answer.

        3. behaviouralQuestions
        - Generate relevant behavioural interview questions.
        - Include the intention behind each question.
        - Include guidance on how the candidate should answer.

        4. skillsGaps
        - Identify skills required by the job that the candidate lacks or needs
          to improve.
        - Assign severity as low, medium, or high.

        5. preparationPlan
        - Create a practical preparation plan.
        - Include the day number, focus area, and specific tasks.

        IMPORTANT:
        - Return ONLY valid JSON.
        - Do not return markdown.
        - Do not wrap the JSON inside a code block.
        - Every required field must be present.
        - Do not use null for required fields.
        `;


        

        const response = await client.models.generateContent({
            model: "gemini-3-flash-preview",

            contents: prompt,

            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportJsonSchema
            }
        });

        console.log("Gemini raw output:");
        console.log(response.text);

        const report = interviewReportSchema.parse(
            JSON.parse(response.text)
        );


        console.log("Interview Report:");
        console.dir(report, {
            depth: null
        });


        return report;

    } catch (error) {

        console.error(
            "Error generating interview report:",
            error
        );

        throw error;
    }
}


module.exports = {
    generateInterviewReport
};