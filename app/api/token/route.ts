import { NextResponse } from "next/server";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function GET() {
  try {
    const speechEngineId = process.env.SPEECH_ENGINE_ID || "";

    if (!speechEngineId) {
      return NextResponse.json(
        { error: "Speech Engine not configured" },
        { status: 500 }
      );
    }

    const response = await elevenlabs.conversationalAi.conversations.getWebrtcToken({
      agentId: speechEngineId,
    });

    return NextResponse.json({ token: response.token });
  } catch (error) {
    console.error("Token generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate conversation token" },
      { status: 500 }
    );
  }
}
