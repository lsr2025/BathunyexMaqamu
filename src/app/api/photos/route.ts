import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Photo memories are not connected yet." },
      { status: 503 }
    );
  }

  let body: {
    uploader_name?: string;
    caption?: string;
    file_path?: string;
    public_url?: string;
    media_type?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const file_path = body.file_path?.trim();
  const public_url = body.public_url?.trim();
  const media_type =
    body.media_type === "image" || body.media_type === "video"
      ? body.media_type
      : null;

  if (!file_path || !public_url || !media_type) {
    return NextResponse.json(
      { error: "Missing file information." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("photo_memories")
    .insert({
      uploader_name: body.uploader_name?.trim()?.slice(0, 120) || null,
      caption: body.caption?.trim()?.slice(0, 300) || null,
      file_path,
      public_url,
      media_type,
    })
    .select("id, uploader_name, caption, file_path, public_url, media_type, created_at")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "We couldn't save your memory. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, memory: data }, { status: 201 });
}
