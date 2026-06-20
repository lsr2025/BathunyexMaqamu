import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";

const QUICK_LINKS = [
  {
    href: "/message-to-mommy",
    title: "Message to Mommy",
    desc: "Share wisdom for her motherhood journey.",
  },
  {
    href: "/letter-to-baby",
    title: "Letter to Baby",
    desc: "Write a note the little explorer will treasure.",
  },
  {
    href: "/predictions",
    title: "Baby Predictions",
    desc: "Guess the date, weight and first word.",
  },
  {
    href: "/photos",
    title: "Photo Memories",
    desc: "Upload your favourite snaps from the day.",
  },
  {
    href: "/guestbook",
    title: "Digital Guestbook",
    desc: "Sign your name in the village book.",
  },
  {
    href: "/programme",
    title: "Event Programme",
    desc: "Follow the safari from base camp onward.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-6">
      <Hero />

      <section className="container-wide">
        <Reveal className="text-center">
          <p className="eyebrow">The Village Awaits</p>
          <h2 className="heading-display mt-2 text-3xl sm:text-4xl">
            Be part of her story
          </h2>
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {QUICK_LINKS.map((item, i) => (
            <Reveal as="li" index={i} key={item.href}>
              <Link
                href={item.href}
                className="card group flex h-full items-center justify-between gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-glow"
              >
                <span>
                  <span className="block font-display text-xl text-bark">
                    {item.title}
                  </span>
                  <span className="mt-1 block font-sans text-sm leading-relaxed text-cocoa">
                    {item.desc}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-beige-200 text-gold transition-all group-hover:border-sage-400 group-hover:bg-sage-50"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
