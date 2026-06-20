"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafariArt } from "./SafariArt";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="container-tight relative pt-2 text-center">
      {/* Artwork */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-sm animate-float"
      >
        <SafariArt className="h-auto w-full drop-shadow-[0_18px_40px_rgba(91,74,54,0.18)]" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="eyebrow mt-2"
      >
        {SITE.date}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="heading-display mt-3 text-[2.6rem] leading-[1.05] sm:text-6xl"
      >
        Nokulunga&rsquo;s Journey
        <span className="mt-1 block bg-gradient-to-r from-sage-600 via-gold-dark to-sage-600 bg-clip-text text-transparent">
          to MammaLand
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-4 font-serif text-base uppercase tracking-[0.28em] text-cocoa"
      >
        {SITE.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        className="mt-6"
      >
        <div className="divider-leaf" />
        <p className="mx-auto mt-6 max-w-md font-display text-2xl leading-snug text-bark sm:text-[1.7rem]">
          &ldquo;Today we celebrate not only the arrival of a precious baby, but
          the birth of a mother.&rdquo;
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-9 flex flex-col items-center gap-4"
      >
        <Link href="/programme" className="btn-primary">
          View Programme
        </Link>

        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-beige-200 bg-ivory/70 px-5 py-2 font-serif text-sm tracking-wide text-cocoa">
          <PinIcon />
          {SITE.venue} · {SITE.city}
        </div>
      </motion.div>
    </section>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z"
        stroke="#b89a5e"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9" r="2.4" stroke="#b89a5e" strokeWidth="1.6" />
    </svg>
  );
}
