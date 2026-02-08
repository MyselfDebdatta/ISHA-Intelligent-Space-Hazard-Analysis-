const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getChatResponse(userMessage) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest"
        });

        const result = await model.generateContent(userMessage);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error("Gemini Error:", error);
        return "⚠️ Space comms offline. Please try again later. (Error: " + error.message + ")";
    }
}

module.exports = { getChatResponse };
