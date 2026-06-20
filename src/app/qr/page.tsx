"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { SITE } from "@/lib/site";
import { SafariArt } from "@/components/SafariArt";

export default function QrPage() {
  const [url, setUrl] = useState(
    process.env.NEXT_PUBLIC_SITE_URL || ""
  );

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SITE_URL && typeof window !== "undefined") {
      setUrl(window.location.origin);
    }
  }, []);

  return (
    <div className="container-tight pb-16 pt-4">
      <div className="mb-6 flex justify-center print:hidden">
        <button onClick={() => window.print()} className="btn-primary">
          Print this card
        </button>
      </div>

      {/* Printable card */}
      <div className="mx-auto max-w-md rounded-3xl border-2 border-gold/40 bg-ivory p-8 text-center shadow-soft print:border-gold print:shadow-none">
        <div className="mx-auto w-40">
          <SafariArt className="h-auto w-full" />
        </div>

        <p className="eyebrow mt-2">You&rsquo;re Invited To Join</p>
        <h1 className="heading-display mt-2 text-3xl leading-tight">
          Nokulunga&rsquo;s Journey to MammaLand
        </h1>
        <p className="mt-2 font-serif text-sm uppercase tracking-[0.24em] text-cocoa">
          {SITE.subtitle}
        </p>

        <div className="my-6 flex justify-center">
          <div className="rounded-2xl border border-beige-200 bg-white p-4">
            {url ? (
              <QRCodeSVG
                value={url}
                size={196}
                level="M"
                fgColor="#445637"
                bgColor="#ffffff"
                marginSize={1}
              />
            ) : (
              <div className="flex h-[196px] w-[196px] items-center justify-center text-xs text-cocoa/50">
                Set NEXT_PUBLIC_SITE_URL
              </div>
            )}
          </div>
        </div>

        <p className="font-display text-lg text-bark">Scan to share your love</p>
        <p className="mt-1 font-sans text-sm text-cocoa">
          Messages · Letters · Predictions · Photos · Guestbook
        </p>

        <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="mt-4 font-serif text-sm tracking-wide text-cocoa">
          {SITE.date} · {SITE.venue} · {SITE.city}
        </p>
        {url && (
          <p className="mt-2 break-all font-sans text-xs text-cocoa/50">{url}</p>
        )}
      </div>
    </div>
  );
}
