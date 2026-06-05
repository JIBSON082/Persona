"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import type { Draft, Tone } from "@/types/supabase";

export function useDrafts() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const fetchDrafts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("drafts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDrafts(data as Draft[]);
    } catch {
      setError("Failed to load drafts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  const saveDraft = useCallback(
    async ({
      topic,
      tone,
      content,
      isHumanized,
      humanScore,
    }: {
      topic: string;
      tone: Tone;
      content: string;
      isHumanized: boolean;
      humanScore: number;
    }): Promise<Draft | null> => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
          .from("drafts")
          .insert({
            user_id: user.id,
            topic,
            tone,
            content,
            is_humanized: isHumanized,
            human_score: humanScore,
          })
          .select()
          .single();

        if (error) throw error;

        const draft = data as Draft;
        setDrafts((prev) => [draft, ...prev]);
        return draft;
      } catch {
        setError("Failed to save draft.");
        return null;
      }
    },
    []
  );

  const deleteDraft = useCallback(async (id: string) => {
    try {
      const { error } = await supabase.from("drafts").delete().eq("id", id);
      if (error) throw error;
      setDrafts((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setError("Failed to delete draft.");
    }
  }, []);

  return {
    drafts,
    loading,
    error,
    saveDraft,
    deleteDraft,
    refetch: fetchDrafts,
  };
}

