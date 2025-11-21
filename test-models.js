const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyAILeUjMU9_R3sfBVM5byxufUOHGBRHzUA";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // There isn't a direct listModels on the instance in some SDK versions, 
        // but we can try to infer or just test a few common ones.
        // Actually, the error message says "Call ListModels". 
        // In the node SDK, it might be under a different manager.
        // Let's just try to generate with a few known candidates.

        const candidates = [
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-1.0-pro",
            "gemini-pro",
            "gemini-2.0-flash-exp"
        ];

        for (const modelName of candidates) {
            console.log(`Testing ${modelName}...`);
            try {
                const m = genAI.getGenerativeModel({ model: modelName });
                await m.generateContent("Hello");
                console.log(`SUCCESS: ${modelName} works!`);
                return;
            } catch (e) {
                console.log(`FAILED: ${modelName} - ${e.message.split('\n')[0]}`);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
