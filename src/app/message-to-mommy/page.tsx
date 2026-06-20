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

export default function MessageToMommyPage() {
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
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          relationship: data.get("relationship"),
          message: data.get("message"),
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
        eyebrow="For The New Mother"
        title="Message to Mommy"
        intro="What would you like Nokulunga to remember during her motherhood journey?"
      />

      <Reveal className="container-tight mt-8">
        {done ? (
          <SuccessPanel
            title="Thank you"
            message="Your words of wisdom have been gathered for Nokulunga's village."
            onReset={() => setDone(false)}
            resetLabel="Write another"
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

            <Field label="Relationship to Nokulunga" htmlFor="relationship">
              <input
                id="relationship"
                name="relationship"
                className="field-input"
                placeholder="Friend, sister, colleague…"
              />
            </Field>

            <Field label="Message" htmlFor="message" required>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="field-input resize-y"
                placeholder="A blessing, a memory, a word of encouragement…"
              />
            </Field>

            <Feedback error={error} />
            <SubmitButton pending={pending}>Send to Mommy</SubmitButton>
          </form>
        )}
      </Reveal>
    </div>
  );
}
