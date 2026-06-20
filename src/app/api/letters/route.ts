import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Letters are not connected yet. Please try again later." },
      { status: 503 }
    );
  }

  let body: { name?: string; letter?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim();
  const letter = body.letter?.trim();

  if (!name || !letter) {
    return NextResponse.json(
      { error: "Please add your name and a letter for baby." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("letters_to_baby").insert({
    name: name.slice(0, 120),
    letter: letter.slice(0, 6000),
  });

  if (error) {
    return NextResponse.json(
      { error: "We couldn't save your letter. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
