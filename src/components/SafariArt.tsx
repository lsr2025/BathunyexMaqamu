/**
 * Hand-drawn Safari nursery artwork — baby giraffe, elephant & lion.
 * A self-contained, scalable SVG used as the hero centrepiece.
 *
 * To use the client's real artwork instead, drop a file at
 * `public/artwork-hero.png` and set `useImage` on the Hero.
 */
export function SafariArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 360"
      className={className}
      role="img"
      aria-label="Watercolour illustration of a baby giraffe, baby elephant and baby lion"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0e2bf" />
          <stop offset="100%" stopColor="#e7d3a1" />
        </radialGradient>
        <linearGradient id="leafG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a9bf9a" />
          <stop offset="100%" stopColor="#6b8757" />
        </linearGradient>
        <radialGradient id="blob" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#e6ede1" />
          <stop offset="100%" stopColor="#d7e2cf" />
        </radialGradient>
      </defs>

      {/* soft watercolour backdrop */}
      <ellipse cx="210" cy="185" rx="190" ry="155" fill="url(#blob)" opacity="0.55" />
      <circle cx="312" cy="84" r="46" fill="url(#sun)" opacity="0.9" />
      <circle cx="312" cy="84" r="60" fill="none" stroke="#d9bf95" strokeWidth="1.2" opacity="0.5" />

      {/* distant foliage */}
      <g opacity="0.8">
        <ellipse cx="70" cy="300" rx="70" ry="46" fill="#cdd9c3" />
        <ellipse cx="350" cy="306" rx="80" ry="44" fill="#cdd9c3" />
      </g>

      {/* ── Baby Giraffe ─────────────────────────────── */}
      <g transform="translate(150 40)">
        {/* neck + body */}
        <path
          d="M44 36c-9 4-12 18-9 34 3 17 4 40 4 56 0 22 16 36 36 36s34-16 34-37c0-15-2-30-4-46-3-22-2-39-12-46-13-9-39-9-49 3Z"
          fill="#dcae6e"
        />
        <path
          d="M44 36c-9 4-12 18-9 34 3 17 4 40 4 56 0 22 16 36 36 36"
          fill="none"
          stroke="#c79350"
          strokeWidth="1"
          opacity="0.4"
        />
        {/* head */}
        <ellipse cx="56" cy="30" rx="26" ry="22" fill="#e6bd80" />
        <path d="M40 28c-3 6-2 14 4 18 7 4 18 4 24-2" fill="#f2d6a6" opacity="0.6" />
        {/* ossicones */}
        <g stroke="#c79350" strokeWidth="4" strokeLinecap="round">
          <path d="M48 12V4" />
          <path d="M66 12V4" />
        </g>
        <circle cx="48" cy="3" r="3.5" fill="#8a6a3e" />
        <circle cx="66" cy="3" r="3.5" fill="#8a6a3e" />
        {/* ears */}
        <ellipse cx="34" cy="22" rx="9" ry="5" fill="#d49f5e" transform="rotate(-24 34 22)" />
        <ellipse cx="80" cy="22" rx="9" ry="5" fill="#d49f5e" transform="rotate(24 80 22)" />
        {/* snout */}
        <ellipse cx="44" cy="42" rx="14" ry="10" fill="#f0d2a2" />
        <circle cx="40" cy="40" r="1.7" fill="#5b4a36" />
        <circle cx="48" cy="44" r="1.7" fill="#5b4a36" />
        {/* eyes */}
        <circle cx="50" cy="26" r="3" fill="#4a3f30" />
        <circle cx="66" cy="26" r="3" fill="#4a3f30" />
        <circle cx="51" cy="25" r="1" fill="#fff" />
        <circle cx="67" cy="25" r="1" fill="#fff" />
        {/* spots */}
        <g fill="#bd8442" opacity="0.85">
          <ellipse cx="52" cy="78" rx="7" ry="6" />
          <ellipse cx="74" cy="92" rx="6" ry="5" />
          <ellipse cx="50" cy="104" rx="7" ry="6" />
          <ellipse cx="76" cy="120" rx="6" ry="6" />
          <ellipse cx="54" cy="132" rx="6" ry="5" />
        </g>
      </g>

      {/* ── Baby Elephant ────────────────────────────── */}
      <g transform="translate(40 168)">
        <ellipse cx="70" cy="92" rx="62" ry="56" fill="#c9c3d1" />
        <ellipse cx="70" cy="100" rx="44" ry="40" fill="#d8d3df" />
        {/* ears */}
        <ellipse cx="22" cy="70" rx="26" ry="30" fill="#bdb6c9" transform="rotate(-12 22 70)" />
        <ellipse cx="118" cy="70" rx="26" ry="30" fill="#bdb6c9" transform="rotate(12 118 70)" />
        <ellipse cx="26" cy="72" rx="16" ry="20" fill="#cfc9d8" transform="rotate(-12 26 72)" />
        <ellipse cx="114" cy="72" rx="16" ry="20" fill="#cfc9d8" transform="rotate(12 114 72)" />
        {/* head */}
        <circle cx="70" cy="58" r="40" fill="#cdc7d6" />
        {/* trunk */}
        <path
          d="M70 70c-4 10-14 16-12 30 1 10 12 16 22 12 9-4 8-14 2-18-6-4-6-12 0-18"
          fill="#cdc7d6"
        />
        <path d="M78 108c4 2 9 1 10-3" stroke="#a79fb6" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* eyes */}
        <circle cx="54" cy="54" r="3.4" fill="#4a3f30" />
        <circle cx="86" cy="54" r="3.4" fill="#4a3f30" />
        <circle cx="55" cy="53" r="1.1" fill="#fff" />
        <circle cx="87" cy="53" r="1.1" fill="#fff" />
        {/* cheeks */}
        <circle cx="46" cy="64" r="5" fill="#e7b9c4" opacity="0.6" />
        <circle cx="94" cy="64" r="5" fill="#e7b9c4" opacity="0.6" />
        {/* little tuft */}
        <path d="M70 18c-2-6 2-10 0-14M70 18c2-6-2-10 0-14" stroke="#a79fb6" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>

      {/* ── Baby Lion ────────────────────────────────── */}
      <g transform="translate(248 176)">
        {/* mane */}
        <g fill="#caa15c">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const cx = 66 + Math.cos(a) * 50;
            const cy = 70 + Math.sin(a) * 50;
            return <circle key={i} cx={cx} cy={cy} r="16" />;
          })}
        </g>
        <circle cx="66" cy="70" r="50" fill="#e0b878" />
        {/* face */}
        <circle cx="66" cy="70" r="40" fill="#f0d6a6" />
        {/* ears */}
        <circle cx="34" cy="40" r="10" fill="#e0b878" />
        <circle cx="98" cy="40" r="10" fill="#e0b878" />
        <circle cx="34" cy="40" r="5" fill="#e7b9c4" opacity="0.7" />
        <circle cx="98" cy="40" r="5" fill="#e7b9c4" opacity="0.7" />
        {/* eyes */}
        <circle cx="52" cy="66" r="3.6" fill="#4a3f30" />
        <circle cx="80" cy="66" r="3.6" fill="#4a3f30" />
        <circle cx="53" cy="65" r="1.2" fill="#fff" />
        <circle cx="81" cy="65" r="1.2" fill="#fff" />
        {/* muzzle */}
        <ellipse cx="66" cy="84" rx="18" ry="14" fill="#fbeed3" />
        <path d="M58 80l8 6 8-6" fill="#c98f63" />
        <path d="M66 86v6m0 0c-3 4-9 3-10-1m10 1c3 4 9 3 10-1" stroke="#a9774f" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* cheeks */}
        <circle cx="44" cy="80" r="4.5" fill="#e7b9c4" opacity="0.6" />
        <circle cx="88" cy="80" r="4.5" fill="#e7b9c4" opacity="0.6" />
      </g>

      {/* foreground leaves */}
      <g fill="url(#leafG)">
        <path d="M2 352c20-8 36-26 40-50-22 2-40 22-40 50Z" opacity="0.9" />
        <path d="M418 352c-20-8-36-26-40-50 22 2 40 22 40 50Z" opacity="0.9" />
        <path d="M150 356c14-4 24-16 26-32-15 1-27 14-26 32Z" opacity="0.7" />
      </g>
    </svg>
  );
}
