import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Server client using the public anon key — respects RLS. Used for public
 * reads (guestbook, photo gallery) and the password-gated admin_export RPC
 * inside server code.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (!supabaseUrl || !anonKey) {
    return null;
  }
  return createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
