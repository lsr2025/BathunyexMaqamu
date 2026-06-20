"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";

const ICONS: Record<string, React.ReactNode> = {
  "/": <IconHome />,
  "/programme": <IconProgramme />,
  "/message-to-mommy": <IconHeart />,
  "/letter-to-baby": <IconLetter />,
  "/predictions": <IconStar />,
  "/photos": <IconCamera />,
  "/guestbook": <IconBook />,
};

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-beige-200/80 bg-ivory/90 backdrop-blur-md"
    >
      <ul className="container-wide flex items-stretch justify-between gap-0.5 overflow-x-auto px-2 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {NAV_LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href} className="flex-1">
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-w-[3.5rem] flex-col items-center gap-1 rounded-2xl px-2 py-1.5 transition-colors ${
                  active
                    ? "text-sage-700"
                    : "text-cocoa/60 hover:text-sage-600"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
                    active ? "bg-sage-100" : "bg-transparent"
                  }`}
                >
                  {ICONS[link.href]}
                </span>
                <span className="font-serif text-[0.62rem] tracking-wide">
                  {link.short}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const sw = { strokeWidth: 1.6, stroke: "currentColor", fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconHome() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...sw}>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}
function IconProgramme() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...sw}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...sw}>
      <path d="M12 20s-7-4.6-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6C19 15.4 12 20 12 20Z" />
    </svg>
  );
}
function IconLetter() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...sw}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...sw}>
      <path d="M12 4l2.3 4.8 5.2.7-3.8 3.6.9 5.1L12 16.9 7.4 18.3l.9-5.1L4.5 9.5l5.2-.7L12 4Z" />
    </svg>
  );
}
function IconCamera() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...sw}>
      <path d="M3.5 8.5h3l1.5-2h6l1.5 2h3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...sw}>
      <path d="M4 5.5A2 2 0 0 1 6 4h6v16H6a2 2 0 0 0-2 1.5Z" />
      <path d="M20 5.5A2 2 0 0 0 18 4h-6v16h6a2 2 0 0 1 2 1.5Z" />
    </svg>
  );
}
