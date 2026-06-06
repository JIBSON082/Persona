// src/lib/supabase.server.ts
import "server-only";
import { createServerClient, createBrowserClient } from "@supabase/ssr";
import { cookies } from "next/headers";
// 🛠️ Fixed import path: pulled from local supabase file
import type { Database } from "@/lib/supabase"; 

// ── Server client (API routes, Server Components, middleware) ──────────────
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Safe to ignore in Server Components
          }
        },
      },
    }
  );
}

// ── Service role client (webhooks, trusted server contexts only) ───────────
export function createServiceClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
