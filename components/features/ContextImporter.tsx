"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type ImportMethod = "paste" | "manual" | "notion";

export function ContextImporter() {
  const [method, setMethod] = useState<ImportMethod>("paste");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) return;
    setSaving(true);
    try {
      await fetch("/api/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "default",
          category: "background",
          content: content.trim(),
          source: method,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      setContent("");
    } catch (error) {
      console.error("Failed to save context:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-white mb-3">Add context about yourself</h3>
      <p className="text-xs text-gray-500 mb-4">Help your co-founder know you better. The more context, the better the advice.</p>

      {/* Method tabs */}
      <div className="flex gap-2 mb-4">
        {([
          { key: "paste" as const, label: "\ud83d\udcce Paste from AI", desc: "Copy from ChatGPT/Gemini" },
          { key: "manual" as const, label: "\u270d\ufe0f Write manually", desc: "Type your background" },
          { key: "notion" as const, label: "\ud83d\udcdd Notion", desc: "Coming soon" },
        ]).map((m) => (
          <button
            key={m.key}
            onClick={() => m.key !== "notion" && setMethod(m.key)}
            className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              method === m.key
                ? "bg-brand-600/20 text-brand-300 border border-brand-500/30"
                : m.key === "notion"
                ? "bg-surface-raised text-gray-600 cursor-not-allowed"
                : "bg-surface-raised text-gray-400 hover:text-gray-200 border border-transparent"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Paste hint */}
      {method === "paste" && (
        <div className="mb-3 p-3 rounded-xl bg-brand-500/5 border border-brand-500/10">
          <p className="text-xs text-brand-300">\ud83d\udca1 Ask ChatGPT or Gemini: &quot;Write a comprehensive summary of who I am, my skills, goals, and what I\u2019m working on. Format it as context for an AI co-founder.&quot;</p>
        </div>
      )}

      {/* Text area */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={method === "paste" ? "Paste the AI-generated context here..." : "Tell your co-founder about yourself, your skills, goals, and current projects..."}
        className="w-full px-4 py-3 bg-surface-raised border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[120px] resize-none"
      />

      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-600">{content.length} characters</span>
        <Button onClick={handleSave} isLoading={saving} size="sm" disabled={!content.trim()}>
          {saved ? "\u2705 Saved!" : "Save context"}
        </Button>
      </div>
    </div>
  );
}
