import { NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || "",
    baseURL: "https://api.groq.com/openai/v1",
});

export async function GET() {
    try {
        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                { error: "Groq API Key not configured" },
                { status: 500 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are a motivational fitness coach. Generate short, powerful motivational quotes about fitness, health, and personal growth. Keep them under 20 words."
                },
                {
                    role: "user",
                    content: "Give me one powerful motivational quote about fitness and transformation."
                },
            ],
        });

        const quote = completion.choices[0].message.content || "Your only limit is you.";

        return NextResponse.json({ quote });
    } catch (error) {
        console.error("Error generating quote:", error);
        return NextResponse.json(
            { quote: "Your only limit is you." },
            { status: 200 }
        );
    }
}
