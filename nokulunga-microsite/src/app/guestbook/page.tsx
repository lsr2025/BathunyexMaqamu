"use client";

import { useEffect, useState } from "react";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { Field, Feedback, SubmitButton } from "@/components/forms/FormElements";
import type { GuestbookEntry } from "@/lib/types";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/guestbook")
      .then((r) => r.json())
      .then((j) => setEntries(j.entries ?? []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setEntries((prev) => [json.entry as GuestbookEntry, ...prev]);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="pb-8">
      <PageHeading
        eyebrow="Sign The Village Book"
        title="Digital Guestbook"
        intro="Leave your mark on Nokulunga's journey — a name, a wish, a memory."
      />

      <Reveal className="container-tight mt-8">
        <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
          <Field label="Name" htmlFor="name" required>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              className="field-input"
              placeholder="Your name"
            />
          </Field>

          <Field label="Message" htmlFor="message" required>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="field-input resize-y"
              placeholder="Your message for the family…"
            />
          </Field>

          <Feedback error={error} />
          <SubmitButton pending={pending}>Sign the Guestbook</SubmitButton>
        </form>
      </Reveal>

      <section className="container-wide mt-12">
        <h2 className="text-center font-display text-2xl text-bark">
          From The Village
        </h2>
        <div className="divider-leaf mt-4" />

        {loading ? (
          <p className="mt-8 text-center font-sans text-sm text-cocoa/60">
            Loading messages…
          </p>
        ) : entries.length === 0 ? (
          <p className="mt-8 text-center font-sans text-sm text-cocoa/60">
            No signatures yet — be the first to sign.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {entries.map((entry, i) => (
              <Reveal as="article" index={i % 6} key={entry.id}>
                <div className="card relative h-full p-6">
                  <span
                    aria-hidden
                    className="absolute right-5 top-3 font-display text-5xl leading-none text-sage-100"
                  >
                    &rdquo;
                  </span>
                  <p className="relative font-serif text-[1.05rem] leading-relaxed text-bark">
                    {entry.message}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-lg text-gold-dark">
                      {entry.name}
                    </span>
                    <span className="font-sans text-xs text-cocoa/50">
                      {formatDate(entry.created_at)}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
