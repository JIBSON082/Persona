// src/app/dashboard/page.tsx
"use client";

import { useState } from "react";
import InputPanel from "@/components/dashboard/InputPanel";
import OutputPanel from "@/components/dashboard/OutputPanel";
import { useGenerate } from "@/hooks/useGenerate";
import { useDrafts } from "@/hooks/useDrafts";
// 🛠️ Fixed type import path: pointing to lib instead of types
import type { Tone } from "@/lib/supabase"; 

export default function DashboardPage() {
  const [topic, setTopic] = useState("");
  const [selectedTone, setSelectedTone] = useState<Tone>("casual");

  // Custom hooks handling the state mechanics & the interactive UI illusion
  const { 
    postContent, 
    humanScore, 
    isGenerating, 
    isHumanizing, 
    generatePost, 
    humanizePost 
  } = useGenerate();

  const { saveDraft } = useDrafts();

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    await generatePost({ topic, tone: selectedTone });
  };

  const handleHumanize = async () => {
    if (!postContent) return;
    await humanizePost();
  };

  const handleSave = async () => {
    if (!postContent) return;
    await saveDraft({
      topic,
      tone: selectedTone,
      content: postContent,
      human_score: humanScore,
      is_humanized: humanScore !== null && humanScore >= 90
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

        {/* Two-Column Premium Layout split precisely into Input vs Output panels */}
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
            content={postContent}
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
