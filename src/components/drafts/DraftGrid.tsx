"use client";

import { useState, useMemo } from "react";
import { Search, Copy, Trash2, Check, FileText } from "lucide-react";
import { useDrafts } from "@/hooks/useDrafts";
import { Button } from "@/components/ui/button";
import { cn, timeAgo, truncate, TONE_LABELS, TONE_EMOJIS } from "@/lib/utils";
import type { Draft, Tone } from "@/types/supabase";

const TONE_FILTERS: { value: "all" | Tone; label: string }[] = [
  { value: "all", label: "All" },
  { value: "professional", label: "💼 Professional" },
  { value: "casual", label: "✌️ Casual" },
  { value: "storyteller", label: "📖 Storyteller" },
  { value: "bold", label: "⚡ Bold" },
];

function DraftCard({ draft, onDelete }: { draft: Draft; onDelete: (id: string) => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(draft.content).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-glass rounded-2xl p-5 flex flex-col gap-3 group hover:border-white/10 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white/40 truncate">{draft.topic}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-white/40 font-medium">
            {TONE_EMOJIS[draft.tone]} {TONE_LABELS[draft.tone]}
          </span>
          {draft.is_humanized && (
            <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium">
              Humanized
            </span>
          )}
        </div>
      </div>

      {/* Content preview */}
      <p className="text-sm text-white/65 leading-relaxed flex-1">
        {truncate(draft.content, 160)}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/25 font-mono">{draft.char_count} chars</span>
          {draft.human_score && (
            <span className="text-xs text-white/25 font-mono">{draft.human_score}% human</span>
          )}
          <span className="text-xs text-white/20">{timeAgo(draft.created_at)}</span>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button size="icon" variant="ghost" onClick={handleCopy} className="h-7 w-7">
            {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
          </Button>
          <Button
            size="icon"
            variant="danger"
            onClick={() => onDelete(draft.id)}
            className="h-7 w-7"
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DraftGrid() {
  const { drafts, loading, deleteDraft } = useDrafts();
  const [search, setSearch] = useState("");
  const [toneFilter, setToneFilter] = useState<"all" | Tone>("all");

  const filtered = useMemo(() => {
    return drafts.filter((d) => {
      const matchesTone = toneFilter === "all" || d.tone === toneFilter;
      const matchesSearch =
        !search ||
        d.topic.toLowerCase().includes(search.toLowerCase()) ||
        d.content.toLowerCase().includes(search.toLowerCase());
      return matchesTone && matchesSearch;
    });
  }, [drafts, search, toneFilter]);

  return (
    <div className="space-y-6">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              "w-full pl-9 pr-4 py-2.5 rounded-xl text-sm",
              "bg-white/3 border border-white/7 text-white/80 placeholder:text-white/20",
              "focus:outline-none focus:border-indigo-500/40 transition-all duration-300"
            )}
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {TONE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setToneFilter(f.value)}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                toneFilter === f.value
                  ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-300"
                  : "bg-white/3 border border-white/7 text-white/40 hover:text-white/60 hover:bg-white/5"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <p className="text-xs text-white/25 font-mono">
        {filtered.length} of {drafts.length} posts
      </p>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-glass rounded-2xl p-5 space-y-3 h-48">
              {[100, 70, 85, 50].map((w, j) => (
                <div key={j} className="skeleton h-3 rounded" style={{ width: `${w}%` }} />
              ))}
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/15">
          <FileText size={32} />
          <p className="text-sm">
            {drafts.length === 0 ? "No saved drafts yet" : "No posts match your filters"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((draft) => (
            <DraftCard key={draft.id} draft={draft} onDelete={deleteDraft} />
          ))}
        </div>
      )}
    </div>
  );
}

