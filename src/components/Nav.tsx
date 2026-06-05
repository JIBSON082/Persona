"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, Zap, Folder, Settings, LogOut, User } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/dashboard", label: "Generator", icon: Zap },
  { href: "/drafts", label: "Vault", icon: Folder },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-6 bg-glass border-b border-white/5">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-persona">
          <Sparkles size={14} className="text-white" />
        </div>
        <span className="font-bold text-base tracking-tight text-white">
          Persona
        </span>
        <span className="text-xs px-1.5 py-0.5 rounded-md font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Beta
        </span>
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-1">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                  : "text-white/40 hover:text-white/70 border border-transparent hover:bg-white/5"
              )}
            >
              <Icon size={13} />
              {label}
            </Link>
          );
        })}
      </div>

      {/* User / Sign out */}
      <div className="flex items-center gap-2">
        <Link
          href="/settings"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/4 border border-white/7 text-white/60 hover:text-white/80 transition-all duration-200 text-xs font-medium"
        >
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-persona">
            <User size={11} className="text-white" />
          </div>
          Account
        </Link>
        <button
          onClick={handleSignOut}
          className="p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all duration-200"
          title="Sign out"
        >
          <LogOut size={14} />
        </button>
      </div>
    </nav>
  );
}

