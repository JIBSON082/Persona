"use client";

import { useState, useRef, useCallback } from "react";
import type { Tone } from "@/types/supabase";

type Phase = "idle" | "generating" | "generated" | "humanizing" | "humanized";

interface GenerateState {
  phase: Phase;
  post: string;
  humanizedPost: string;
  humanScore: number;
  error: string | null;
}

export function useGenerate() {
  const [state, setState] = useState<GenerateState>({
    phase: "idle",
    post: "",
    humanizedPost: "",
    humanScore: 0,
    error: null,
  });

  const scoreInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearScoreInterval = () => {
    if (scoreInterval.current) clearInterval(scoreInterval.current);
  };

  const animateScore = useCallback(
    (from: number, to: number, onComplete?: () => void) => {
      clearScoreInterval();
      let current = from;
      const steps = 40;
      const increment = (to - from) / steps;

      scoreInterval.current = setInterval(() => {
        current += increment + (Math.random() * 0.4 - 0.1);
        if (current >= to) {
          clearScoreInterval();
          setState((s) => ({ ...s, humanScore: to }));
          onComplete?.();
        } else {
          setState((s) => ({ ...s, humanScore: Math.round(current) }));
        }
      }, 30);
    },
    []
  );

  const generate = useCallback(
    async (topic: string, tone: Tone) => {
      clearScoreInterval();
      setState({ phase: "generating", post: "", humanizedPost: "", humanScore: 0, error: null });

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "generate", topic, tone }),
        });

        if (!res.ok) throw new Error("Generation failed");

        const { post, score } = await res.json();

        setState((s) => ({ ...s, phase: "generated", post }));
        animateScore(0, score);
      } catch (err) {
        setState((s) => ({
          ...s,
          phase: "idle",
          error: "Failed to generate post. Please try again.",
        }));
      }
    },
    [animateScore]
  );

  const humanize = useCallback(
    async (tone: Tone) => {
      const currentPost = state.post;
      if (!currentPost) return;

      setState((s) => ({ ...s, phase: "humanizing", error: null }));

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "humanize", post: currentPost, tone }),
        });

        if (!res.ok) throw new Error("Humanization failed");

        const { post: humanizedPost, score } = await res.json();

        setState((s) => ({ ...s, humanizedPost }));
        animateScore(state.humanScore, score, () => {
          setState((s) => ({ ...s, phase: "humanized" }));
        });
      } catch (err) {
        setState((s) => ({
          ...s,
          phase: "generated",
          error: "Failed to humanize. Please try again.",
        }));
      }
    },
    [state.post, state.humanScore, animateScore]
  );

  const updatePost = useCallback((content: string) => {
    setState((s) =>
      s.phase === "humanized"
        ? { ...s, humanizedPost: content }
        : { ...s, post: content }
    );
  }, []);

  const reset = useCallback(() => {
    clearScoreInterval();
    setState({ phase: "idle", post: "", humanizedPost: "", humanScore: 0, error: null });
  }, []);

  const displayPost = state.humanizedPost || state.post;

  return {
    ...state,
    displayPost,
    generate,
    humanize,
    updatePost,
    reset,
    isIdle: state.phase === "idle",
    isGenerating: state.phase === "generating",
    isGenerated: state.phase === "generated",
    isHumanizing: state.phase === "humanizing",
    isHumanized: state.phase === "humanized",
    hasPost: ["generated", "humanizing", "humanized"].includes(state.phase),
    canHumanize: state.phase === "generated",
  };
}

