"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [llmConfig, setLlmConfig] = useState({
    baseUrl: "https://api.studio.nebius.com/v1",
    smartModel: "meta-llama/Meta-Llama-3.1-70B-Instruct",
    fastModel: "meta-llama/Meta-Llama-3.1-8B-Instruct",
    apiKey: "",
  });
  const [elevenlabsKey, setElevenlabsKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("winer_llm_config", JSON.stringify(llmConfig));
    localStorage.setItem("winer_elevenlabs_key", elevenlabsKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
      <p className="text-sm text-gray-400 mb-8">Configure your AI co-founder&apos;s brain and voice.</p>

      {/* LLM Config */}
      <section className="glass rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">\ud83e\udde0 LLM Configuration</h2>
        <p className="text-xs text-gray-500 mb-4">BYO LLM — use any OpenAI-compatible API. Default: Nebius Studio (Llama 3.1)</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">API Base URL</label>
            <input value={llmConfig.baseUrl} onChange={(e) => setLlmConfig({ ...llmConfig, baseUrl: e.target.value })} className="w-full px-4 py-2.5 bg-surface-raised border border-white/10 rounded-xl text-sm text-white font-mono placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">API Key</label>
            <input type="password" value={llmConfig.apiKey} onChange={(e) => setLlmConfig({ ...llmConfig, apiKey: e.target.value })} className="w-full px-4 py-2.5 bg-surface-raised border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Your API key" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Smart Model (strategy/review)</label>
              <input value={llmConfig.smartModel} onChange={(e) => setLlmConfig({ ...llmConfig, smartModel: e.target.value })} className="w-full px-4 py-2.5 bg-surface-raised border border-white/10 rounded-xl text-xs text-white font-mono placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Fast Model (chat/casual)</label>
              <input value={llmConfig.fastModel} onChange={(e) => setLlmConfig({ ...llmConfig, fastModel: e.target.value })} className="w-full px-4 py-2.5 bg-surface-raised border border-white/10 rounded-xl text-xs text-white font-mono placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Voice Config */}
      <section className="glass rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">\ud83c\udf99\ufe0f Voice Configuration</h2>
        <p className="text-xs text-gray-500 mb-4">ElevenLabs Speech Engine handles voice. Bring your own API key.</p>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">ElevenLabs API Key</label>
          <input type="password" value={elevenlabsKey} onChange={(e) => setElevenlabsKey(e.target.value)} className="w-full px-4 py-2.5 bg-surface-raised border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Your ElevenLabs API key" />
        </div>
      </section>

      {/* About */}
      <section className="glass rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">\u2728 About Winer</h2>
        <p className="text-sm text-gray-400">v0.1.0 \u2014 Built for ElevenHacks #10: Speech Engine</p>
        <p className="text-sm text-gray-500 mt-1">Open source. BYO everything. Never build alone.</p>
      </section>

      <Button onClick={handleSave} className="w-full">
        {saved ? "\u2705 Saved!" : "Save settings"}
      </Button>
    </div>
  );
}
