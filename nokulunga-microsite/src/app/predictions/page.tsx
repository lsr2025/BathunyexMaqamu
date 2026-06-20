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

const LOOKS = ["Mommy", "Daddy", "Both"] as const;

export default function PredictionsPage() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [looksLike, setLooksLike] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_name: data.get("guest_name"),
          arrival_date: data.get("arrival_date"),
          weight: data.get("weight"),
          looks_like: looksLike,
          first_word: data.get("first_word"),
          future_career: data.get("future_career"),
          special_wish: data.get("special_wish"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setLooksLike("");
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
        eyebrow="A Little Game"
        title="Baby Predictions"
        intro="Gaze into the safari skies and guess what's coming for the little explorer."
      />

      <Reveal className="container-tight mt-8">
        {done ? (
          <SuccessPanel
            title="Prediction logged"
            message="We'll see how close you were when the little one finally arrives!"
            onReset={() => setDone(false)}
            resetLabel="Make another guess"
          />
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
            <Field label="Guest Name" htmlFor="guest_name" required>
              <input
                id="guest_name"
                name="guest_name"
                required
                autoComplete="name"
                className="field-input"
                placeholder="Your name"
              />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Predicted Arrival Date" htmlFor="arrival_date">
                <input
                  id="arrival_date"
                  name="arrival_date"
                  type="date"
                  className="field-input"
                />
              </Field>

              <Field label="Predicted Weight" htmlFor="weight">
                <input
                  id="weight"
                  name="weight"
                  className="field-input"
                  placeholder="e.g. 3.4 kg"
                />
              </Field>
            </div>

            <fieldset>
              <legend className="field-label">Who Will Baby Look Like?</legend>
              <div className="grid grid-cols-3 gap-3">
                {LOOKS.map((option) => {
                  const active = looksLike === option;
                  return (
                    <label
                      key={option}
                      className={`cursor-pointer rounded-2xl border px-3 py-3 text-center font-serif text-sm tracking-wide transition-all ${
                        active
                          ? "border-sage-400 bg-sage-100 text-sage-700 shadow-sm"
                          : "border-beige-200 bg-white/70 text-cocoa hover:border-sage-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="looks_like"
                        value={option}
                        checked={active}
                        onChange={() => setLooksLike(option)}
                        className="sr-only"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Field label="Baby's First Word" htmlFor="first_word">
              <input
                id="first_word"
                name="first_word"
                className="field-input"
                placeholder="Mama? Dada? Roar?"
              />
            </Field>

            <Field label="Future Career" htmlFor="future_career">
              <input
                id="future_career"
                name="future_career"
                className="field-input"
                placeholder="Explorer, doctor, ranger…"
              />
            </Field>

            <Field label="Special Wish" htmlFor="special_wish">
              <textarea
                id="special_wish"
                name="special_wish"
                rows={3}
                className="field-input resize-y"
                placeholder="A wish for the little one's journey…"
              />
            </Field>

            <Feedback error={error} />
            <SubmitButton pending={pending}>Submit Prediction</SubmitButton>
          </form>
        )}
      </Reveal>
    </div>
  );
}
