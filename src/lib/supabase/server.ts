import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Privileged server-side client using the service-role key. Bypasses RLS.
 * Only ever import this from server code (API routes / server components).
 * Returns `null` if the service role key is not configured.
 */
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Server client using the public anon key — respects RLS. Used for public
 * reads (guestbook, photo gallery) inside server components.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (!supabaseUrl || !anonKey) {
    return null;
  }
  return createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
