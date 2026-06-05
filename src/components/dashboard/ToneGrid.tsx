"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/supabase";

const TONES: { id: Tone; label: string; emoji: string; desc: string }[] = [
  { id: "professional", label: "Professional", emoji: "💼", desc: "Authoritative & clear" },
  { id: "casual",       label: "Casual",       emoji: "✌️", desc: "Relaxed & real" },
  { id: "storyteller",  label: "Storyteller",  emoji: "📖", desc: "Emotional & vivid" },
  { id: "bold",         label: "Bold",         emoji: "⚡", desc: "Direct & fearless" },
];

interface ToneGridProps {
  value: Tone;
  onChange: (tone: Tone) => void;
  disabled?: boolean;
}

export default function ToneGrid({ value, onChange, disabled }: ToneGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {TONES.map((tone) => {
        const isActive = value === tone.id;
        return (
          <button
            key={tone.id}
            onClick={() => onChange(tone.id)}
            disabled={disabled}
            className={cn(
              "relative p-3 rounded-xl text-left transition-all duration-300",
              "border disabled:opacity-40 disabled:cursor-not-allowed",
              isActive
                ? "bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 border-indigo-500/60"
                : "bg-white/2 border-white/6 hover:bg-white/4 hover:border-white/12"
            )}
            style={
              isActive
                ? { boxShadow: "0 0 20px rgba(99,102,241,0.2), inset 0 0 20px rgba(99,102,241,0.05)" }
                : {}
            }
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-base leading-none">{tone.emoji}</span>
              <span
                className={cn(
                  "text-sm font-semibold transition-colors",
                  isActive ? "text-indigo-300" : "text-white/70"
                )}
              >
                {tone.label}
              </span>
            </div>
            <p className="text-xs text-white/30">{tone.desc}</p>
            {isActive && (
              <div className="absolute top-2 right-2">
                <Check size={12} className="text-indigo-400" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

