"use client";

import { useState, useEffect } from "react";
import { CreditCard, Zap, Check, ShieldCheck, User } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToneGrid from "@/components/dashboard/ToneGrid";
import { cn, formatDate } from "@/lib/utils";
import type { Profile, Subscription, Tone } from "@/types/supabase";

export default function SettingsView() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [defaultTone, setDefaultTone] = useState<Tone>("professional");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: prof }, { data: sub }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("subscriptions").select("*").eq("user_id", user.id).single(),
      ]);

      if (prof) { setProfile(prof as Profile); setDefaultTone((prof as Profile).default_tone); }
      if (sub) setSubscription(sub as Subscription);
    };
    load();
  }, []);

  const handleSaveTone = async () => {
    if (!profile) return;
    setSaving(true);
    await supabase.from("profiles").update({ default_tone: defaultTone }).eq("id", profile.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleBillingPortal = async () => {
    setBillingLoading(true);
    const res = await fetch("/api/billing/portal", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
    setBillingLoading(false);
  };

  const handleUpgrade = async () => {
    setBillingLoading(true);
    const res = await fetch("/api/billing/checkout", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
    setBillingLoading(false);
  };

  const isPro = subscription?.plan === "pro" && subscription?.status === "active";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile card */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-persona shrink-0">
              <User size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">
                {profile?.full_name || "Your Account"}
              </p>
              <p className="text-sm text-white/40">{profile?.email}</p>
            </div>
            <div className="ml-auto">
              <span className={cn(
                "text-xs px-2.5 py-1 rounded-full font-semibold border",
                isPro
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                  : "bg-white/5 border-white/10 text-white/40"
              )}>
                {isPro ? "✦ Pro" : "Free"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription card */}
      <Card>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard size={16} className="text-white/40" />
            <h3 className="font-semibold text-white">Subscription</h3>
          </div>

          {isPro ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-cyan-500/8 border border-cyan-500/20">
                <div>
                  <p className="font-semibold text-cyan-300">Persona Pro</p>
                  <p className="text-xs text-white/40 mt-0.5">
                    Renews {subscription?.current_period_end
                      ? formatDate(subscription.current_period_end)
                      : "—"}
                  </p>
                </div>
                <Zap size={20} className="text-cyan-400" />
              </div>
              <Button variant="outline" size="md" onClick={handleBillingPortal} disabled={billingLoading} className="w-full">
                {billingLoading ? "Loading…" : "Manage Billing"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-lg">$9 <span className="text-sm font-normal text-white/40">/ month</span></p>
                    <p className="text-xs text-white/40 mt-0.5">Unlimited posts & humanizations</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 font-medium">
                    Pro Plan
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Unlimited post generation",
                    "✨ Humanize It feature",
                    "Human Score badge",
                    "Drafts vault (unlimited)",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Check size={12} className="text-green-400 shrink-0" />
                      <span className="text-xs text-white/55">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="primary" size="lg" onClick={handleUpgrade} disabled={billingLoading} className="w-full">
                {billingLoading ? "Loading…" : "Upgrade to Pro →"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Default tone card */}
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-white/40" />
            <h3 className="font-semibold text-white">Default Writing Tone</h3>
          </div>
          <p className="text-xs text-white/35">
            Pre-selected every time you open the generator.
          </p>
          <ToneGrid value={defaultTone} onChange={setDefaultTone} />
          <Button
            variant="primary"
            size="md"
            onClick={handleSaveTone}
            disabled={saving}
            className="w-full"
          >
            {saved ? <><Check size={14} /> Saved!</> : saving ? "Saving…" : "Save Preference"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

