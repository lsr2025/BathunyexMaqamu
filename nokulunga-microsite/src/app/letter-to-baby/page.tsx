"use client";

import { useState } from "react";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import {
  Field,
  Feedback,
  SubmitButton,
  SuccessPanel,
} from "@/components/forms/FormElements";

export default function LetterToBabyPage() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          letter: data.get("letter"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="pb-8">
      <PageHeading
        eyebrow="A Note For The Future"
        title="Letter to Baby"
        intro="What would you like baby to know one day?"
      />

      <Reveal className="container-tight mt-8">
        {done ? (
          <SuccessPanel
            title="Sealed with love"
            message="Your letter has been tucked away for the little explorer to read one day."
            onReset={() => setDone(false)}
            resetLabel="Write another letter"
          />
        ) : (
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

            <Field label="Dear Little Explorer" htmlFor="letter" required>
              <textarea
                id="letter"
                name="letter"
                required
                rows={10}
                className="field-input resize-y font-serif text-[1.02rem] leading-relaxed"
                placeholder="Dear Little Explorer,&#10;&#10;One day, when you are old enough to read this…"
              />
            </Field>

            <Feedback error={error} />
            <SubmitButton pending={pending}>Seal the Letter</SubmitButton>
          </form>
        )}
      </Reveal>
    </div>
  );
}
