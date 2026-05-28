/**
 * WINER — Create Speech Engine
 *
 * Run this once to create a Speech Engine on ElevenLabs.
 * You'll need your ngrok URL first.
 *
 * Usage: ELEVENLABS_API_KEY=xxx NGROK_URL=wss://abc123.ngrok.io npx tsx scripts/create-speech-engine.ts
 */

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

async function main() {
  const ngrokUrl = process.env.NGROK_URL;
  if (!ngrokUrl) {
    console.error("❌ Set NGROK_URL environment variable first.");
    console.error("   Example: NGROK_URL=wss://abc123.ngrok.io npx tsx scripts/create-speech-engine.ts");
    process.exit(1);
  }

  const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
  });

  console.log("\n🍷 Creating Winer Speech Engine...\n");

  const engine = await elevenlabs.speechEngine.create({
    name: "Winer AI Co-founder",
    speechEngine: {
      wsUrl: `${ngrokUrl}/ws`,
    },
  });

  console.log(`✅ Speech Engine created!`);
  console.log(`   Engine ID: ${engine.engineId}`);
  console.log(`\n   Add this to your .env file:`);
  console.log(`   SPEECH_ENGINE_ID=${engine.engineId}`);
  console.log(`   NEXT_PUBLIC_SPEECH_ENGINE_ID=${engine.engineId}\n`);
}

main().catch(console.error);
