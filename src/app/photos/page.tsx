"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { Field, Feedback } from "@/components/forms/FormElements";
import {
  getSupabaseBrowserClient,
  STORAGE_BUCKET,
} from "@/lib/supabase/client";
import type { PhotoMemory } from "@/lib/types";

const MAX_BYTES = 60 * 1024 * 1024; // 60 MB

export default function PhotosPage() {
  const [memories, setMemories] = useState<PhotoMemory[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadMemories = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("photo_memories")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(120);
    setMemories((data as PhotoMemory[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMemories();
  }, [loadMemories]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Uploads are not connected yet. Please try again later.");
      return;
    }
    if (!file) {
      setError("Please choose a photo or video to share.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That file is a little large — please keep it under 60 MB.");
      return;
    }

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) {
      setError("Only images and short videos can be uploaded.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    setPending(true);
    setProgress("Uploading your memory…");
    try {
      const ext = file.name.split(".").pop() || (isImage ? "jpg" : "mp4");
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw new Error("Upload failed. Please try again.");

      const { data: pub } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(path);

      setProgress("Saving…");
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uploader_name: data.get("uploader_name"),
          caption: data.get("caption"),
          file_path: path,
          public_url: pub.publicUrl,
          media_type: isImage ? "image" : "video",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not save your memory.");

      setMemories((prev) => [json.memory as PhotoMemory, ...prev]);
      form.reset();
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
      setProgress(null);
    }
  }

  return (
    <div className="pb-8">
      <PageHeading
        eyebrow="Captured Moments"
        title="Photo Memories"
        intro="Share your favourite snaps and short clips from the celebration."
      />

      <Reveal className="container-tight mt-8">
        <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
          <Field label="Your Name" htmlFor="uploader_name">
            <input
              id="uploader_name"
              name="uploader_name"
              autoComplete="name"
              className="field-input"
              placeholder="So we know who shared it"
            />
          </Field>

          <Field label="Caption" htmlFor="caption">
            <input
              id="caption"
              name="caption"
              className="field-input"
              placeholder="A little note about this moment"
            />
          </Field>

          <Field
            label="Photo or Video"
            htmlFor="file"
            required
            hint="Images and short videos up to 60 MB."
          >
            <input
              ref={fileRef}
              id="file"
              name="file"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="field-input file:mr-3 file:rounded-full file:border-0 file:bg-sage-100 file:px-4 file:py-1.5 file:font-serif file:text-sm file:text-sage-700"
            />
          </Field>

          <Feedback error={error} />
          {progress && (
            <p className="text-center font-serif text-sm text-sage-600">
              {progress}
            </p>
          )}
          <button type="submit" disabled={pending} className="btn-primary w-full">
            {pending ? "Uploading…" : "Share Memory"}
          </button>
        </form>
      </Reveal>

      {/* Gallery */}
      <section className="container-wide mt-12">
        <h2 className="text-center font-display text-2xl text-bark">
          The Memory Wall
        </h2>
        <div className="divider-leaf mt-4" />

        {loading ? (
          <p className="mt-8 text-center font-sans text-sm text-cocoa/60">
            Loading memories…
          </p>
        ) : memories.length === 0 ? (
          <p className="mt-8 text-center font-sans text-sm text-cocoa/60">
            No memories yet — be the first to share one.
          </p>
        ) : (
          <div className="mt-8 columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
            {memories.map((m, i) => (
              <Reveal key={m.id} index={i % 6} className="break-inside-avoid">
                <figure className="card overflow-hidden">
                  {m.media_type === "image" ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={m.public_url}
                      alt={m.caption || "Shared memory"}
                      loading="lazy"
                      className="w-full object-cover"
                    />
                  ) : (
                    <video
                      src={m.public_url}
                      controls
                      preload="metadata"
                      className="w-full"
                    />
                  )}
                  {(m.caption || m.uploader_name) && (
                    <figcaption className="px-3 py-2">
                      {m.caption && (
                        <p className="font-sans text-xs leading-snug text-bark">
                          {m.caption}
                        </p>
                      )}
                      {m.uploader_name && (
                        <p className="mt-0.5 font-serif text-[0.7rem] tracking-wide text-gold-dark">
                          — {m.uploader_name}
                        </p>
                      )}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
