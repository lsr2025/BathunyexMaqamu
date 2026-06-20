import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const LOOKS = new Set(["Mommy", "Daddy", "Both"]);

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Predictions are not connected yet. Please try again later." },
      { status: 503 }
    );
  }

  let body: Record<string, string | undefined>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const guest_name = body.guest_name?.trim();
  if (!guest_name) {
    return NextResponse.json(
      { error: "Please add your name." },
      { status: 400 }
    );
  }

  const looks_like =
    body.looks_like && LOOKS.has(body.looks_like) ? body.looks_like : null;

  const arrival_date = body.arrival_date?.trim() || null;

  const { error } = await supabase.from("predictions").insert({
    guest_name: guest_name.slice(0, 120),
    arrival_date,
    weight: body.weight?.trim()?.slice(0, 60) || null,
    looks_like,
    first_word: body.first_word?.trim()?.slice(0, 120) || null,
    future_career: body.future_career?.trim()?.slice(0, 160) || null,
    special_wish: body.special_wish?.trim()?.slice(0, 1000) || null,
  });

  if (error) {
    return NextResponse.json(
      { error: "We couldn't save your prediction. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
