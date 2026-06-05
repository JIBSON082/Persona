
"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Copy, Save, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Confetti ────────────────────────────────────────────────────────────────
function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<React.CSSProperties[]>([]);
  useEffect(() => {
    if (!active) return;
    const colors = ["#818cf8","#22d3ee","#34d399","#fbbf24","#f472b6","#60a5fa"];
    setParticles(
      Array.from({ length: 26 }, (_, i) => ({
        position: "absolute" as const,
        left: `${20 + Math.random() * 60}%`,
        top: `${5 + Math.random() * 35}%`,
        width: `${4 + Math.random() * 6}px`,
        height: `${4 + Math.random() * 8}px`,
        borderRadius: "2px",
        background: colors[i % colors.length],
        opacity: 0,
        transform: `rotate(${Math.random() * 360}deg)`,
        animation: `confettiFall ${0.6 + Math.random() * 0.7}s ease-out ${Math.random() * 0.25}s forwards`,
        pointerEvents: "none" as const,
      }))
    );
    setTimeout(() => setParticles([]), 2000);
  }, [active]);

  if (!particles.length) return null;
  return (
    <>
      <style>{`
        @keyframes confettiFall {
          0%   { opacity:1; transform: translateY(-8px) rotate(0deg) scale(1); }
          100% { opacity:0; transform: translateY(56px) rotate(720deg) scale(0.4); }
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
        {particles.map((style, i) => <div key={i} style={style} />)}
      </div>
    </>
  );
}

// ── Human Score Badge ────────────────────────────────────────────────────────
function HumanScoreBadge({
  score,
  isAnalyzing,
  isComplete,
}: {
  score: number;
  isAnalyzing: boolean;
  isComplete: boolean;
}) {
  const circumference = 2 * Math.PI * 28;
  const dash = (score / 100) * circumference;
  const color = isComplete
    ? "#22d3ee"
    : score >= 90 ? "#34d399"
    : score >= 80 ? "#fbbf24"
    : "#f97316";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-20 h-20">
        {isComplete && (
          <div
            className="absolute inset-0 rounded-full animate-pulse-glow"
            style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 70%)` }}
          />
        )}
        {isAnalyzing && (
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              background: "conic-gradient(from 0deg, #818cf8, #22d3ee, #34d399, #818cf8)",
              padding: "2px",
              borderRadius: "50%",
            }}
          />
        )}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <circle
            cx="32" cy="32" r="28" fill="none"
            stroke={color} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            style={{
              transition: "stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1), stroke 0.5s ease",
              filter: `drop-shadow(0 0 6px ${color}80)`,
            }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full"
          style={{ background: "rgba(11,15,25,0.92)" }}
        >
          {isAnalyzing ? (
            <ShieldCheck size={18} className="text-indigo-400 animate-pulse" />
          ) : (
            <span
              className="text-lg font-bold"
              style={{ color, fontFamily: "var(--font-dm-mono), monospace", transition: "color 0.5s ease" }}
            >
              {score}%
            </span>
          )}
        </div>
      </div>
      <span
        className="text-xs font-medium tracking-widest uppercase"
        style={{
          color: isAnalyzing ? "#818cf8" : color,
          fontFamily: "var(--font-dm-mono), monospace",
          transition: "color 0.5s ease",
        }}
      >
        {isAnalyzing ? "Analyzing…" : isComplete ? "Human ✓" : "Human Score"}
      </span>
    </div>
  );
}

// ── Output Panel ─────────────────────────────────────────────────────────────
interface OutputPanelProps {
  displayPost: string;
  humanScore: number;
  phase: string;
  isGenerating: boolean;
  isHumanizing: boolean;
  isHumanized: boolean;
  canHumanize: boolean;
  hasPost: boolean;
  onHumanize: () => void;
  onPostChange: (v: string) => void;
  onSave: () => void;
}

export default function OutputPanel({
  displayPost,
  humanScore,
  phase,
  isGenerating,
  isHumanizing,
  isHumanized,
  canHumanize,
  hasPost,
  onHumanize,
  onPostChange,
  onSave,
}: OutputPanelProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const prevPhase = useRef(phase);

  // Trigger confetti exactly once when transitioning to humanized
  useEffect(() => {
    if (prevPhase.current !== "humanized" && phase === "humanized") {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 100);
    }
    prevPhase.current = phase;
  }, [phase]);

  const handleCopy = () => {
    if (!displayPost) return;
    navigator.clipboard.writeText(displayPost).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-glass rounded-2xl p-6 flex flex-col gap-4 h-full relative overflow-hidden">
      <Confetti active={confetti} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-widest text-white/35">
          {isHumanized ? "Humanized Post ✦" : "Generated Post"}
        </label>
        {hasPost && (
          <span className="text-xs text-white/20 font-mono">
            {displayPost.length} chars
          </span>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 min-h-[240px] relative">
        {/* Empty state */}
        {!hasPost && !isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/12">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/3 border border-white/5">
              <Sparkles size={20} className="opacity-40" />
            </div>
            <p className="text-xs text-center max-w-[200px] leading-relaxed">
              Your LinkedIn post will appear here
            </p>
          </div>
        )}

        {/* Skeleton loader */}
        {isGenerating && (
          <div className="space-y-3 pt-2">
            {[85, 100, 70, 95, 55, 80, 45, 90].map((w, i) => (
              <div
                key={i}
                className="skeleton h-3 rounded"
                style={{ width: `${w}%`, animationDelay: `${i * 0.07}s` }}
              />
            ))}
          </div>
        )}

        {/* Post textarea */}
        {hasPost && (
          <textarea
            value={displayPost}
            onChange={(e) => onPostChange(e.target.value)}
            rows={12}
            className={cn(
              "w-full h-full resize-none bg-transparent border-none",
              "text-sm leading-[1.8] text-white/82",
              "focus:outline-none",
              "animate-text-reveal"
            )}
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          />
        )}
      </div>

      {/* Score + Humanize */}
      {hasPost && (
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className={isHumanized ? "animate-badge-pop" : ""}>
            <HumanScoreBadge
              score={humanScore}
              isAnalyzing={isHumanizing}
              isComplete={isHumanized}
            />
          </div>

          <button
            onClick={onHumanize}
            disabled={!canHumanize}
            className={cn(
              "px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2",
              "transition-all duration-300 disabled:cursor-default",
              canHumanize && "animate-humanize-pulse",
              isHumanized
                ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
                : canHumanize
                ? "bg-gradient-to-br from-indigo-500/30 to-cyan-500/15 border border-indigo-500/50 text-indigo-300"
                : "bg-white/4 border border-white/6 text-white/20"
            )}
          >
            {isHumanizing ? (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-400/30 border-t-indigo-400 animate-spin" />
                Polishing…
              </>
            ) : isHumanized ? (
              <><Check size={14} /> Humanized</>
            ) : (
              <><Sparkles size={14} /> ✨ Humanize It</>
            )}
          </button>
        </div>
      )}

      {/* Copy + Save */}
      {hasPost && (
        <div className="flex gap-2">
          <Button
            variant={copied ? "outline" : "ghost"}
            size="md"
            onClick={handleCopy}
            className={cn("flex-1", copied && "border-green-500/30 text-green-400")}
          >
            {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
          </Button>
          <Button
            variant={saved ? "outline" : "ghost"}
            size="md"
            onClick={handleSave}
            className={cn("flex-1", saved && "border-indigo-500/30 text-indigo-400")}
          >
            {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Draft</>}
          </Button>
        </div>
      )}
    </div>
  );
}
