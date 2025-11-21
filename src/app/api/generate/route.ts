import { NextResponse } from "next/server";
import OpenAI from "openai";
import { UserData } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const userData: UserData = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API Key not configured" },
        { status: 500 }
      );
    }

    const prompt = `
      Act as an expert fitness coach and nutritionist. Generate a personalized 7-day workout and diet plan for the following user:
      
      Name: ${userData.name}
      Age: ${userData.age}
      Gender: ${userData.gender}
      Height: ${userData.height}cm
      Weight: ${userData.weight}kg
      Goal: ${userData.goal}
      Fitness Level: ${userData.level}
      Location: ${userData.location}
      Dietary Preferences: ${userData.dietaryPreferences}
      Medical History: ${userData.medicalHistory || "None"}

      Return the response strictly in the following JSON format:
      {
        "workoutPlan": [
          {
            "day": "Day 1",
            "focus": "Chest and Triceps",
            "exercises": [
              { "name": "Push-ups", "sets": "3", "reps": "12", "rest": "60s", "notes": "Keep back straight" }
            ]
          }
        ],
        "dietPlan": [
          {
            "day": "Day 1",
            "breakfast": { "name": "Oatmeal", "description": "Oats with berries", "calories": "300", "protein": "10g", "carbs": "50g", "fats": "5g" },
            "lunch": { "name": "Grilled Chicken", "description": "Chicken breast with rice", "calories": "500", "protein": "40g", "carbs": "40g", "fats": "10g" },
            "dinner": { "name": "Salad", "description": "Mixed greens", "calories": "200", "protein": "5g", "carbs": "10g", "fats": "5g" },
            "snacks": [
               { "name": "Almonds", "description": "Handful of almonds", "calories": "150", "protein": "6g", "carbs": "5g", "fats": "14g" }
            ]
          }
        ],
        "tips": ["Drink water", "Sleep 8 hours"],
        "motivation": "You can do it!"
      }
      
      Ensure the plan is detailed and appropriate for the user's level and goal. Provide 7 days of workouts and diets.
      Do not include any markdown formatting like \`\`\`json. Just return the raw JSON string.
    `;

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Using a strong model available on Groq
      messages: [
        { role: "system", content: "You are a helpful fitness assistant that outputs only valid JSON." },
        { role: "user", content: prompt },
      ],
    });

    const text = completion.choices[0].message.content || "";

    // Clean up potential markdown code blocks
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const plan = JSON.parse(cleanedText);

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "Failed to generate plan", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
