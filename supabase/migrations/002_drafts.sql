-- 002_drafts.sql
-- Stores all saved LinkedIn posts (drafts)

create table if not exists public.drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  topic text not null,
  tone text not null default 'professional'
    check (tone in ('professional', 'casual', 'storyteller', 'bold')),
  content text not null,               -- The final post content
  is_humanized boolean not null default false,
  human_score integer check (human_score between 0 and 100),
  char_count integer generated always as (char_length(content)) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for fast user draft lookups
create index drafts_user_id_created_at_idx
  on public.drafts (user_id, created_at desc);

-- Auto-update updated_at
create trigger drafts_updated_at
  before update on public.drafts
  for each row execute procedure public.handle_updated_at();

-- Row Level Security
alter table public.drafts enable row level security;

create policy "Users can view their own drafts"
  on public.drafts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own drafts"
  on public.drafts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own drafts"
  on public.drafts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own drafts"
  on public.drafts for delete
  using (auth.uid() = user_id);

