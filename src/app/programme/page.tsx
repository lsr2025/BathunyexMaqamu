import type { Metadata } from "next";
import { PROGRAMME, SITE } from "@/lib/site";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: `Programme · ${SITE.title}`,
  description: `The full programme for ${SITE.title} — ${SITE.date} at ${SITE.venue}, ${SITE.city}.`,
};

export default function ProgrammePage() {
  return (
    <div className="pb-8">
      <PageHeading
        eyebrow="The Expedition"
        title="Event Programme"
        intro={`${SITE.date} · ${SITE.venue}, ${SITE.city}`}
      />

      <ol className="container-tight mt-10 space-y-3">
        {PROGRAMME.map((item, i) => (
          <Reveal as="li" index={i % 6} key={`${item.time}-${item.title}`}>
            <article className="card relative flex gap-4 p-5">
              {/* time column */}
              <div className="flex flex-col items-center">
                <span className="rounded-full bg-sage-100 px-3 py-1 font-serif text-sm tracking-wide text-sage-700">
                  {item.time}
                </span>
                {i < PROGRAMME.length - 1 && (
                  <span
                    aria-hidden
                    className="mt-2 w-px flex-1 bg-gradient-to-b from-beige-200 to-transparent"
                  />
                )}
              </div>

              {/* content */}
              <div className="flex-1 pb-1">
                <h2 className="font-display text-xl leading-tight text-bark">
                  {item.title}
                </h2>
                {item.details && (
                  <ul className="mt-1.5 space-y-0.5">
                    {item.details.map((d) => (
                      <li
                        key={d}
                        className="font-sans text-sm leading-relaxed text-cocoa"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </ol>

      <p className="container-tight mt-10 text-center font-display text-2xl text-gold-dark">
        Welcome to the herd. 🌿
      </p>
    </div>
  );
}
