
// ── Tone ──────────────────────────────────────────────────────────────────
export type Tone = "professional" | "casual" | "storyteller" | "bold";

// ── Draft ─────────────────────────────────────────────────────────────────
export interface Draft {
  id: string;
  user_id: string;
  topic: string;
  tone: Tone;
  content: string;
  is_humanized: boolean;
  human_score: number | null;
  char_count: number;
  created_at: string;
  updated_at: string;
}

// ── Profile ───────────────────────────────────────────────────────────────
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  default_tone: Tone;
  created_at: string;
  updated_at: string;
}

// ── Subscription ──────────────────────────────────────────────────────────
export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  plan: "free" | "pro";
  status: "active" | "inactive" | "past_due" | "canceled" | "trialing";
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

// ── Supabase DB types (simplified — replace with generated types) ─────────
export type Database = {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      drafts: { Row: Draft; Insert: Omit<Draft, "id" | "char_count" | "created_at" | "updated_at">; Update: Partial<Draft> };
      subscriptions: { Row: Subscription; Insert: Partial<Subscription>; Update: Partial<Subscription> };
    };
  };
};
