"use client";

import { Zap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ToneGrid from "./ToneGrid";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/supabase";

interface InputPanelProps {
  topic: string;
  tone: Tone;
  isGenerating: boolean;
  isHumanizing: boolean;
  onTopicChange: (v: string) => void;
  onToneChange: (t: Tone) => void;
  onGenerate: () => void;
}

export default function InputPanel({
  topic,
  tone,
  isGenerating,
  isHumanizing,
  onTopicChange,
  onToneChange,
  onGenerate,
}: InputPanelProps) {
  const isBusy = isGenerating || isHumanizing;
  const canGenerate = topic.trim().length > 0 && !isBusy;

  return (
    <div className="bg-glass rounded-2xl p-6 flex flex-col gap-5 h-full">
      {/* Topic input */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-white/35 mb-3">
          Topic / Prompt
        </label>
        <Textarea
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="What lesson did you learn from your biggest failure? Share a specific moment..."
          rows={6}
          disabled={isBusy}
          className="disabled:opacity-50"
        />
        <p className="mt-1.5 text-xs text-white/20 text-right font-mono">
          {topic.length} chars
        </p>
      </div>

      {/* Tone selector */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-white/35 mb-3">
          Writing Tone
        </label>
        <ToneGrid value={tone} onChange={onToneChange} disabled={isBusy} />
      </div>

      {/* Generate button */}
      <Button
        variant="primary"
        size="lg"
        onClick={onGenerate}
        disabled={!canGenerate}
        className="w-full mt-auto"
      >
        {isGenerating ? (
          <>
            <span>Crafting your post</span>
            <span className="flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="inline-block w-1 h-1 rounded-full bg-white/60 animate-dot-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
          </>
        ) : (
          <>
            <Zap size={15} />
            Generate Post
          </>
        )}
      </Button>
    </div>
  );
}

