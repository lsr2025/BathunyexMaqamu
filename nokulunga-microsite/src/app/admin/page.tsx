"use client";

import { useState } from "react";
import { PageHeading } from "@/components/PageHeading";
import { Field, Feedback } from "@/components/forms/FormElements";
import { downloadCSV } from "@/lib/export/csv";
import { generateKeepsakePDF } from "@/lib/export/keepsake";
import type { KeepsakeData } from "@/lib/types";

type Tab = "messages" | "letters" | "predictions" | "guestbook" | "photos";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [data, setData] = useState<KeepsakeData | null>(null);
  const [tab, setTab] = useState<Tab>("messages");
  const [pdfBusy, setPdfBusy] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed.");
      setData(json.data as KeepsakeData);
      setAuthed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setPending(false);
    }
  }

  async function handleKeepsake() {
    if (!data) return;
    setPdfBusy(true);
    try {
      await generateKeepsakePDF(data);
    } catch {
      setError("Could not generate the keepsake PDF.");
    } finally {
      setPdfBusy(false);
    }
  }

  if (!authed) {
    return (
      <div className="pb-8">
        <PageHeading
          eyebrow="Private"
          title="Admin Panel"
          intro="Enter the password to view and export all submissions."
        />
        <div className="container-tight mt-8">
          <form onSubmit={handleLogin} className="card space-y-5 p-6 sm:p-8">
            <Field label="Password" htmlFor="password" required>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="field-input"
                placeholder="••••••••"
              />
            </Field>
            <Feedback error={error} />
            <button type="submit" disabled={pending} className="btn-primary w-full">
              {pending ? "Checking…" : "Enter"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const counts: { key: Tab; label: string; count: number }[] = [
    { key: "messages", label: "Messages", count: data?.messages.length ?? 0 },
    { key: "letters", label: "Letters", count: data?.letters.length ?? 0 },
    { key: "predictions", label: "Predictions", count: data?.predictions.length ?? 0 },
    { key: "guestbook", label: "Guestbook", count: data?.guestbook.length ?? 0 },
    { key: "photos", label: "Photos", count: data?.photos.length ?? 0 },
  ];

  return (
    <div className="pb-8">
      <PageHeading eyebrow="Private" title="Admin Panel" />

      <div className="container-wide mt-8 space-y-6">
        {/* Export toolbar */}
        <div className="card flex flex-col gap-3 p-5">
          <h2 className="font-display text-xl text-bark">Keepsake & Exports</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleKeepsake}
              disabled={pdfBusy}
              className="btn-gold"
            >
              {pdfBusy ? "Building…" : "Generate Keepsake PDF"}
            </button>
            <button
              onClick={() => {
                if (!data) return;
                downloadCSV(data.messages, "messages-to-mommy.csv");
                downloadCSV(data.letters, "letters-to-baby.csv");
                downloadCSV(data.predictions, "baby-predictions.csv");
                downloadCSV(data.guestbook, "guestbook.csv");
                downloadCSV(data.photos, "photo-memories.csv");
              }}
              className="btn-ghost"
            >
              Export All CSV
            </button>
          </div>
          <p className="font-sans text-xs text-cocoa/60">
            The Keepsake PDF compiles every submission into &ldquo;Nokulunga&rsquo;s
            Village&rdquo; — cover page, event details, programme, guestbook, letters,
            messages, predictions and photos.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {counts.map((c) => (
            <button
              key={c.key}
              onClick={() => setTab(c.key)}
              className={`rounded-full px-4 py-2 font-serif text-sm tracking-wide transition-colors ${
                tab === c.key
                  ? "bg-sage-600 text-ivory"
                  : "border border-beige-200 bg-white/70 text-cocoa hover:border-sage-300"
              }`}
            >
              {c.label} · {c.count}
            </button>
          ))}
        </div>

        {/* Panels */}
        {data && (
          <div className="space-y-4">
            {tab === "messages" &&
              (data.messages.length ? (
                data.messages.map((m) => (
                  <div key={m.id} className="card p-5">
                    <p className="font-serif italic text-bark">&ldquo;{m.message}&rdquo;</p>
                    <p className="mt-2 font-display text-gold-dark">
                      {m.name}
                      {m.relationship ? ` · ${m.relationship}` : ""}
                    </p>
                  </div>
                ))
              ) : (
                <Empty />
              ))}

            {tab === "letters" &&
              (data.letters.length ? (
                data.letters.map((l) => (
                  <div key={l.id} className="card p-5">
                    <p className="font-serif text-sm text-sage-700">Dear Little Explorer,</p>
                    <p className="mt-1 whitespace-pre-wrap font-sans text-sm text-bark">
                      {l.letter}
                    </p>
                    <p className="mt-2 font-display text-gold-dark">— {l.name}</p>
                  </div>
                ))
              ) : (
                <Empty />
              ))}

            {tab === "predictions" &&
              (data.predictions.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-sm">
                    <thead>
                      <tr className="bg-sage-100 text-left font-serif text-sage-700">
                        {["Guest", "Arrival", "Weight", "Looks Like", "First Word", "Career", "Wish"].map(
                          (h) => (
                            <th key={h} className="px-3 py-2">{h}</th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {data.predictions.map((p) => (
                        <tr key={p.id} className="border-b border-beige-100 text-bark">
                          <td className="px-3 py-2">{p.guest_name}</td>
                          <td className="px-3 py-2">{p.arrival_date ?? "—"}</td>
                          <td className="px-3 py-2">{p.weight ?? "—"}</td>
                          <td className="px-3 py-2">{p.looks_like ?? "—"}</td>
                          <td className="px-3 py-2">{p.first_word ?? "—"}</td>
                          <td className="px-3 py-2">{p.future_career ?? "—"}</td>
                          <td className="px-3 py-2">{p.special_wish ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Empty />
              ))}

            {tab === "guestbook" &&
              (data.guestbook.length ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {data.guestbook.map((g) => (
                    <div key={g.id} className="card p-5">
                      <p className="font-serif italic text-bark">&ldquo;{g.message}&rdquo;</p>
                      <p className="mt-2 font-display text-gold-dark">{g.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty />
              ))}

            {tab === "photos" &&
              (data.photos.length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {data.photos.map((p) => (
                    <div key={p.id} className="card overflow-hidden">
                      {p.media_type === "image" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.public_url} alt={p.caption || ""} className="w-full object-cover" />
                      ) : (
                        <video src={p.public_url} controls preload="metadata" className="w-full" />
                      )}
                      <div className="flex items-center justify-between gap-2 px-3 py-2">
                        <span className="truncate font-sans text-xs text-cocoa">
                          {p.uploader_name || "Guest"}
                        </span>
                        <a
                          href={p.public_url}
                          download
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 font-serif text-xs text-sage-600 underline"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Empty() {
  return (
    <p className="card p-8 text-center font-sans text-sm text-cocoa/60">
      No submissions in this category yet.
    </p>
  );
}
