import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "The guestbook is not connected yet. Please try again later." },
      { status: 503 }
    );
  }

  let body: { name?: string; relationship?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim();
  const message = body.message?.trim();
  const relationship = body.relationship?.trim() || null;

  if (!name || !message) {
    return NextResponse.json(
      { error: "Please add your name and a message." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("messages_to_mommy").insert({
    name: name.slice(0, 120),
    relationship: relationship ? relationship.slice(0, 120) : null,
    message: message.slice(0, 4000),
  });

  if (error) {
    return NextResponse.json(
      { error: "We couldn't save your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
