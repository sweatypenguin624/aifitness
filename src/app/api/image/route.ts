import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Using Pollinations.ai (Free, URL-based)
    // We add a random seed to ensure freshness if needed, though prompt variation usually suffices.
    // We can also specify width/height if needed, e.g., /p/{prompt}?width=1024&height=1024
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=1024&height=768&seed=${Math.floor(Math.random() * 1000)}`;

    return NextResponse.json({
      imageUrl: imageUrl
    });

  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
