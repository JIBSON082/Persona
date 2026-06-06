"use client";

import { useState } from "react";
import InputPanel from "@/components/dashboard/InputPanel";
import OutputPanel from "@/components/dashboard/OutputPanel";
import { useGenerate } from "@/hooks/useGenerate";
import { useDrafts } from "@/hooks/useDrafts";
import type { Tone } from "@/app/api/generate/prompts";

export default function DashboardPage() {
  const [topic, setTopic] = useState("");
  const [selectedTone, setSelectedTone] = useState<Tone>("casual");

  const {
    displayPost,
    humanScore,
    isGenerating,
    isHumanizing,
    generate,
    humanize,
  } = useGenerate();

  const { saveDraft } = useDrafts();

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    await generate(topic, selectedTone);
  };

  const handleHumanize = async () => {
    if (!displayPost) return;
    await humanize(selectedTone);
  };

  const handleSave = async () => {
    if (!displayPost) return;
    await saveDraft({
      topic,
      tone: selectedTone,
      content: displayPost,
      humanScore: humanScore,
      isHumanized: humanScore !== null && humanScore >= 90,
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-zinc-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Craft high-impact LinkedIn content tailored perfectly to your persona.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <InputPanel
            topic={topic}
            setTopic={setTopic}
            selectedTone={selectedTone}
            setSelectedTone={setSelectedTone}
            onGenerate={handleGenerate}
            isLoading={isGenerating}
          />

          <OutputPanel
            content={displayPost}
            humanScore={humanScore}
            isGenerating={isGenerating}
            isHumanizing={isHumanizing}
            onHumanize={handleHumanize}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}