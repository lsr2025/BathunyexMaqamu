import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { KeepsakeData } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password = body.password ?? "";
  if (!password) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 }
    );
  }

  // Privileged read via the password-gated SECURITY DEFINER function.
  // The function raises on a bad password, so any error is treated as denied.
  const { data, error } = await supabase.rpc("admin_export", {
    p_password: password,
  });

  if (error) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const payload = (data ?? {}) as Partial<KeepsakeData>;
  return NextResponse.json({
    data: {
      messages: payload.messages ?? [],
      letters: payload.letters ?? [],
      predictions: payload.predictions ?? [],
      photos: payload.photos ?? [],
      guestbook: payload.guestbook ?? [],
    },
  });
}
