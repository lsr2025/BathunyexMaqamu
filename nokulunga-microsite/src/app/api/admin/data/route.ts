import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSWORD ?? "";

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const provided = body.password ?? "";
  if (!expected || !provided || !timingSafeEqual(provided, expected)) {
    return NextResponse.json(
      { error: "Incorrect password." },
      { status: 401 }
    );
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase service role is not configured." },
      { status: 503 }
    );
  }

  const [messages, letters, predictions, photos, guestbook] = await Promise.all([
    supabase.from("messages_to_mommy").select("*").order("created_at", { ascending: false }),
    supabase.from("letters_to_baby").select("*").order("created_at", { ascending: false }),
    supabase.from("predictions").select("*").order("created_at", { ascending: false }),
    supabase.from("photo_memories").select("*").order("created_at", { ascending: false }),
    supabase.from("guestbook").select("*").order("created_at", { ascending: false }),
  ]);

  const firstError =
    messages.error || letters.error || predictions.error || photos.error || guestbook.error;
  if (firstError) {
    return NextResponse.json(
      { error: "Could not load submissions." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    data: {
      messages: messages.data ?? [],
      letters: letters.data ?? [],
      predictions: predictions.data ?? [],
      photos: photos.data ?? [],
      guestbook: guestbook.data ?? [],
    },
  });
}
