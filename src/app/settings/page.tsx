import Nav from "@/components/Nav";
import SettingsView from "@/components/settings/SettingsView";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Nav />
      <main className="pt-14 px-4 pb-8 max-w-[1280px] mx-auto">
        <div className="py-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Settings size={16} className="text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          </div>
          <p className="text-sm text-white/35 ml-12">
            Manage your account, billing, and preferences
          </p>
        </div>
        <SettingsView />
      </main>
    </div>
  );
}

