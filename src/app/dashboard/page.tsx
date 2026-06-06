"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import InputPanel from "@/components/dashboard/InputPanel";
import OutputPanel from "@/components/dashboard/OutputPanel";
import { useGenerate } from "@/hooks/useGenerate";
import { useDrafts } from "@/hooks/useDrafts";
import type { Tone } from "@/types/supabase";

export default function DashboardPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("professional");

  const gen = useGenerate();
  const { saveDraft } = useDrafts();

  const handleGenerate = () => gen.generate(topic, tone);
  const handleHumanize = () => gen.humanize(tone);

  const handleSave = async () => {
    if (!gen.displayPost) return;
    await saveDraft({
      topic,
      tone,
      content: gen.displayPost,
      isHumanized: gen.isHumanized,
      humanScore: gen.humanScore,
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Nav />
      <main className="pt-14 px-4 pb-8 max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="py-8 text-center animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
              AI Content Generator
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Your voice.{" "}
            <span className="text-gradient">Amplified by AI.</span>
          </h1>
          <p className="text-sm text-white/35">
            Generate LinkedIn posts that sound unmistakably human
          </p>
        </div>

        {/* Split pane */}
        <div
          className="grid gap-4 animate-fade-in-up"
          style={{ gridTemplateColumns: "1fr 1fr", animationDelay: "0.1s" }}
        >
          <InputPanel
            topic={topic}
            tone={tone}
            isGenerating={gen.isGenerating}
            isHumanizing={gen.isHumanizing}
            onTopicChange={(v) => setTopic(v)}
            onToneChange={(t) => setTone(t)}
            onGenerate={handleGenerate}
          />
          <OutputPanel
            displayPost={gen.displayPost}
            humanScore={gen.humanScore}
            phase={gen.phase}
            isGenerating={gen.isGenerating}
            isHumanizing={gen.isHumanizing}
            isHumanized={gen.isHumanized}
            canHumanize={gen.canHumanize}
            hasPost={gen.hasPost}
            onHumanize={handleHumanize}
            onPostChange={gen.updatePost}
            onSave={handleSave}
          />
        </div>

        {gen.error && (
          <p className="text-center text-sm text-red-400 mt-4">{gen.error}</p>
        )}

        <p className="text-center text-xs text-white/15 mt-5">
          Posts are AI-assisted and designed to match your human voice. Always review before publishing.
        </p>
      </main>
    </div>
  );
}
