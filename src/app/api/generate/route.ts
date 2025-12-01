import { NextResponse } from "next/server";
import OpenAI from "openai";
import { UserData } from "@/types";

export const dynamic = "force-dynamic";

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
      Act as an expert fitness coach and nutritionist specializing in Indian cuisine and dietary habits. Generate a personalized 7-day workout and diet plan for the following user:
      
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

      IMPORTANT DIETARY GUIDELINES FOR INDIAN AUDIENCE:
      - All meals should feature authentic Indian dishes and ingredients commonly available in India
      - For "Non-Veg" preference: Provide a BALANCED mix - include both vegetarian meals (around 40-50% of meals) and non-vegetarian meals (chicken, fish, eggs). This reflects typical Indian eating habits where people don't eat meat at every meal.
      - For "Veg" preference: Focus on protein-rich vegetarian options like paneer, dal, legumes, soy, and dairy
      - Use Indian cooking methods: curry, dal, roti, rice, sabzi, etc.
      - Include traditional Indian breakfast items like: poha, upma, idli, dosa, paratha, oats with Indian spices
      - Lunch and dinner should include combinations like: dal-rice, roti-sabzi, curry with rice/roti
      - Snacks should be Indian-friendly: nuts, fruits, chana, sprouts, yogurt, etc.
      - Mention Indian spices and preparation methods (e.g., "tadka dal", "stir-fried with jeera")
      - Consider meal timings common in India (breakfast 8-9am, lunch 1-2pm, dinner 8-9pm)

      CRITICAL INSTRUCTIONS FOR VARIETY:
      - Ensure HIGH VARIETY in meals. Do not repeat the same breakfast, lunch, or dinner more than once if possible.
      - Introduce different Indian cuisines (North Indian, South Indian, Maharashtrian, etc.) to keep the diet interesting.
      - For workouts, ensure a good mix of exercises. If a muscle group is repeated, vary the exercises (e.g., Flat Bench Press on Monday, Incline Dumbbell Press on Thursday).
      - Avoid repetitive descriptions. Make each day feel unique and engaging.

      Return the response strictly in the following JSON format:
      {
        "workoutPlan": [
          {
            "day": "Day 1",
            "focus": "Chest and Triceps",
            "exercises": [
              { 
                "name": "Push-ups", 
                "sets": "3", 
                "reps": "12", 
                "rest": "60s", 
                "notes": "Keep back straight",
                "videoUrl": "https://www.youtube.com/watch?v=example" 
              }
            ]
          }
        ],
        "dietPlan": [
          {
            "day": "Day 1",
            "breakfast": { 
              "name": "Poha", 
              "description": "Flattened rice with peanuts and spices", 
              "calories": "300", 
              "protein": "10g", 
              "carbs": "50g", 
              "fats": "8g",
              "recipeUrl": "https://www.example.com/poha-recipe"
            },
            "lunch": { 
              "name": "Dal Rice with Sabzi", 
              "description": "Yellow dal, steamed rice, and mix veg curry", 
              "calories": "500", 
              "protein": "20g", 
              "carbs": "70g", 
              "fats": "10g",
              "recipeUrl": "https://www.example.com/dal-rice-recipe"
            },
            "dinner": { 
              "name": "Grilled Chicken Curry with Roti", 
              "description": "Chicken breast curry with 2 whole wheat rotis", 
              "calories": "450", 
              "protein": "35g", 
              "carbs": "40g", 
              "fats": "12g",
              "recipeUrl": "https://www.example.com/chicken-curry-recipe"
            },
            "snacks": [
               { 
                 "name": "Roasted Chana", 
                 "description": "Spiced roasted chickpeas", 
                 "calories": "150", 
                 "protein": "8g", 
                 "carbs": "20g", 
                 "fats": "4g",
                 "recipeUrl": "https://www.example.com/roasted-chana-recipe"
               }
            ]
          }
        ],
        "tips": ["Drink at least 3-4 liters of water daily", "Get 7-8 hours of sleep", "Have dinner 2 hours before bed"],
        "motivation": "Consistency is the key to transformation!"
      }
      
      IMPORTANT: Include real YouTube video URLs for each exercise tutorial and recipe blog URLs (like Veg Recipes of India, Cooking Shooking, etc.) for each meal.
      Ensure the plan is detailed, culturally appropriate for Indian users, and suitable for the user's level and goal. 
      For Non-Veg preference, alternate between vegetarian and non-vegetarian meals throughout the week - don't make every meal non-veg.
      Provide complete 7 days of workouts and diets with video and recipe URLs.
      Do not include any markdown formatting like \`\`\`json. Just return the raw JSON string.
    `;

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Using a strong model available on Groq
      messages: [
        { role: "system", content: "You are an expert Indian fitness coach and nutritionist who specializes in creating culturally appropriate diet plans featuring authentic Indian cuisine. You always output valid JSON without any markdown formatting." },
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
