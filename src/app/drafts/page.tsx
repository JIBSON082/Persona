import Nav from "@/components/Nav";
import DraftGrid from "@/components/drafts/DraftGrid";
import { Folder } from "lucide-react";

export default function DraftsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Nav />
      <main className="pt-14 px-4 pb-8 max-w-[1280px] mx-auto">
        <div className="py-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Folder size={16} className="text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">The Vault</h1>
          </div>
          <p className="text-sm text-white/35 ml-12">
            All your saved LinkedIn posts in one place
          </p>
        </div>
        <DraftGrid />
      </main>
    </div>
  );
}

