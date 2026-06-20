"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="relative z-[3] w-full">
      <div className="container-wide flex items-center justify-center py-4">
        <Link
          href="/"
          className="group flex flex-col items-center text-center"
          aria-label={`${SITE.title} — home`}
        >
          <span className="flex items-center gap-2 font-display text-lg font-semibold tracking-wide text-bark sm:text-xl">
            <LeafMark />
            <span className="bg-gradient-to-r from-sage-700 via-gold-dark to-sage-700 bg-clip-text text-transparent">
              MammaLand
            </span>
            <LeafMark flip />
          </span>
        </Link>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-beige-200 to-transparent" />
    </header>
  );
}

function LeafMark({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`text-sage-400 ${flip ? "-scale-x-100" : ""}`}
    >
      <path
        d="M4 20C4 11 11 4 20 4C20 13 13 20 4 20Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path d="M6 18C9 13 13 9 18 6" stroke="#fbf8f1" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
