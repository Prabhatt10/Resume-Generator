const { GoogleGenAI } = require("@google/genai");

const client = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function invokeGeminiAI(prompt = "Hello Gemini! Explain what an interview is.") {
    try {
        const response = await client.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt
        });

        console.log(response.text);
        return response.text;

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}

module.exports = invokeGeminiAI;