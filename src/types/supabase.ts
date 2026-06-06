export type Tone = "professional" | "casual" | "storyteller" | "bold";

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

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  default_tone: Tone;
  created_at: string;
  updated_at: string;
}

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

// Loose Database type — prevents Supabase generic conflicts
export type Database = any;