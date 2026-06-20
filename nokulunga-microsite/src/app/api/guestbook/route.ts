import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ entries: [] });
  }

  const { data, error } = await supabase
    .from("guestbook")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ entries: [] });
  }

  return NextResponse.json({ entries: data ?? [] });
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "The guestbook is not connected yet. Please try again later." },
      { status: 503 }
    );
  }

  let body: { name?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim();
  const message = body.message?.trim();

  if (!name || !message) {
    return NextResponse.json(
      { error: "Please add your name and a message." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("guestbook")
    .insert({ name: name.slice(0, 120), message: message.slice(0, 2000) })
    .select("id, name, message, created_at")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "We couldn't sign the guestbook. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, entry: data }, { status: 201 });
}
