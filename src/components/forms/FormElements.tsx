"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

export function Field({
  label,
  htmlFor,
  required,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      {children}
      {hint && <p className="mt-1 font-sans text-xs text-cocoa/60">{hint}</p>}
    </div>
  );
}

export function SubmitButton({
  pending,
  children,
}: {
  pending: boolean;
  children: ReactNode;
}) {
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full">
      {pending ? (
        <>
          <Spinner /> Sending…
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function Feedback({ error }: { error: string | null }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function SuccessPanel({
  title,
  message,
  onReset,
  resetLabel = "Add another",
}: {
  title: string;
  message: string;
  onReset: () => void;
  resetLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card flex flex-col items-center p-9 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-3xl">
        🌿
      </span>
      <h2 className="heading-display mt-5 text-3xl">{title}</h2>
      <p className="mt-3 max-w-sm font-sans text-cocoa">{message}</p>
      <button type="button" onClick={onReset} className="btn-ghost mt-7">
        {resetLabel}
      </button>
    </motion.div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
