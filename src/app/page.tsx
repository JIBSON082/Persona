import Link from "next/link";
import { Sparkles, Check, Zap, ShieldCheck, FileText } from "lucide-react";

const FEATURES = [
  { icon: Zap, title: "Generate in seconds", desc: "Type your topic, pick your tone, get a ready-to-post LinkedIn post instantly." },
  { icon: ShieldCheck, title: "Human Score badge", desc: "Every post is scored on how human it sounds — watch it climb to 96%+" },
  { icon: Sparkles, title: "✨ Humanize It", desc: "One click rewrites the post to defeat AI detectors while keeping your voice intact." },
  { icon: FileText, title: "Drafts Vault", desc: "All your saved posts in one searchable hub. Your personal LinkedIn content library." },
];

const PRICING_FEATURES = [
  "Unlimited post generation",
  "✨ Humanize It (Pass 2 engine)",
  "Human Score badge on every post",
  "4 writing tones",
  "Drafts vault — unlimited saves",
  "Default tone preference",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 h-14 border-b border-white/5 sticky top-0 bg-[#0B0F19]/90 backdrop-blur-xl z-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-persona flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-bold tracking-tight">Persona</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-white/50 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-persona hover:opacity-90 transition-opacity"
          >
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
          <Sparkles size={12} />
          AI-powered LinkedIn content
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight mb-6">
          Your voice.{" "}
          <span className="text-gradient">Amplified by AI.</span>
        </h1>
        <p className="text-lg text-white/45 max-w-xl leading-relaxed mb-10">
          Generate LinkedIn posts that sound unmistakably human. Powered by a
          two-pass AI engine that writes, then humanizes — so you never sound like a robot.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3.5 rounded-xl font-semibold bg-gradient-persona shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-px transition-all duration-300"
          >
            Start for free →
          </Link>
          <Link
            href="/login"
            className="px-6 py-3.5 rounded-xl font-semibold border border-white/10 text-white/70 hover:border-white/20 hover:text-white transition-all duration-300"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-glass rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Icon size={18} className="text-indigo-400" />
              </div>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 pb-24 flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Simple pricing</h2>
        <p className="text-white/40 mb-10">One plan. Everything included.</p>
        <div className="bg-glass rounded-2xl p-8 max-w-sm w-full space-y-6 border border-indigo-500/20">
          <div>
            <p className="text-4xl font-bold text-white">
              $9 <span className="text-lg font-normal text-white/40">/ month</span>
            </p>
            <p className="text-sm text-white/40 mt-1">Cancel anytime</p>
          </div>
          <ul className="space-y-3">
            {PRICING_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                <Check size={14} className="text-green-400 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/signup"
            className="block w-full py-3.5 rounded-xl text-center font-semibold bg-gradient-persona hover:opacity-90 transition-opacity"
          >
            Get started free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/20">
        © {new Date().getFullYear()} Persona. Built for LinkedIn creators.
      </footer>
    </div>
  );
}

