-- 003_subscriptions.sql
-- Tracks Stripe subscription state per user

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  stripe_price_id text,
  plan text not null default 'free'
    check (plan in ('free', 'pro')),
  status text not null default 'inactive'
    check (status in ('active', 'inactive', 'past_due', 'canceled', 'trialing')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for Stripe webhook lookups
create index subscriptions_stripe_customer_idx
  on public.subscriptions (stripe_customer_id);

create index subscriptions_stripe_subscription_idx
  on public.subscriptions (stripe_subscription_id);

-- Auto-create a free subscription row when a profile is created
create or replace function public.handle_new_profile()
returns trigger as $$
begin
  insert into public.subscriptions (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_profile();

-- Auto-update updated_at
create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.handle_updated_at();

-- Row Level Security
alter table public.subscriptions enable row level security;

create policy "Users can view their own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Only service role can insert/update subscriptions (via webhooks)
create policy "Service role manages subscriptions"
  on public.subscriptions for all
  using (auth.role() = 'service_role');

