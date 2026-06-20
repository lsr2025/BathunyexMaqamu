# Nokulunga's Journey to MammaLand 🌿

A premium, mobile-first **Safari-themed baby shower microsite** celebrating
Nokulunga — *A Little Explorer Is On The Way*.

> _"Today we celebrate not only the arrival of a precious baby, but the birth of
> a mother."_

**Event** · 20 June 2026 · Fire & Vine · Pietermaritzburg

---

## ✨ Features

| Page | Description |
| --- | --- |
| **Landing** | Hero artwork, welcome message & "View Programme" call to action |
| **Programme** | Elegant timeline of the day's safari expedition |
| **Message to Mommy** | Guests share wisdom for the motherhood journey → Supabase |
| **Letter to Baby** | Letters for the little explorer to read one day → Supabase |
| **Baby Predictions** | Date, weight, looks-like, first word, career & wishes → Supabase |
| **Photo Memories** | Upload images & short videos → Supabase Storage + live gallery |
| **Digital Guestbook** | Sign the village book; entries shown in elegant cards |
| **Admin Panel** | Password-protected dashboard: view all, CSV export, keepsake PDF, media downloads |
| **QR Card** (`/qr`) | Print-ready invitation card with a scannable QR code |

### Bonus — "Nokulunga's Village" keepsake PDF
From the admin panel, generate a beautifully typeset PDF that compiles **every
submission**: cover page, event details, programme, guestbook, letters,
messages, predictions and event photos.

---

## 🛠 Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** — Luxury Safari Nursery palette (soft sage, ivory, warm beige, muted gold)
- **Framer Motion** — gentle, watercolour-soft animations
- **Supabase** — Postgres database + Storage
- **jsPDF** — keepsake PDF generation
- **Vercel** — hosting

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the template and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (browser-safe) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only** key for admin reads/exports |
| `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` | Storage bucket name (default `memories`) |
| `ADMIN_PASSWORD` | Password protecting `/admin` |
| `NEXT_PUBLIC_SITE_URL` | Public URL — used by the printable QR code |

### 3. Set up the database

In the Supabase dashboard → **SQL Editor**, run the schema:

```
supabase/schema.sql
```

This creates all tables, row-level-security policies and the public
`memories` storage bucket.

### 4. Run locally

```bash
npm run dev
```

Open <http://localhost:3000>.

---

## 🎨 Using the real artwork

The hero illustration is a hand-built SVG (`src/components/SafariArt.tsx`) so the
site looks complete out of the box. To swap in the client's safari baby artwork,
drop the file into `public/` and reference it from `src/components/Hero.tsx`
(e.g. replace `<SafariArt />` with a Next.js `<Image src="/artwork-hero.png" />`).

---

## ☁️ Deploying to Vercel

1. Push this directory to a Git repository.
2. Import the project in [Vercel](https://vercel.com/new) (framework auto-detects as **Next.js**).
3. Add the environment variables from `.env.example` in **Project Settings → Environment Variables**.
4. Deploy. `vercel.json` pins the region to Cape Town (`cpt1`) and adds security headers.

After the first deploy, set `NEXT_PUBLIC_SITE_URL` to your live URL and
redeploy so the `/qr` card encodes the correct address.

---

## 🔒 Security notes

- The **service-role key** is only ever read in server code (`src/lib/supabase/server.ts`, API routes).
- RLS lets anonymous guests **insert** submissions; private content (messages,
  letters, predictions) is **never** publicly readable — only the admin panel
  reads it via the service role.
- Guestbook entries and photos are publicly readable by design (they're shown on-site).
- The admin password is compared with a constant-time check server-side.

---

## 📁 Project structure

```
src/
├── app/
│   ├── page.tsx                 # Landing
│   ├── programme/               # Programme timeline
│   ├── message-to-mommy/        # Form → messages_to_mommy
│   ├── letter-to-baby/          # Form → letters_to_baby
│   ├── predictions/             # Form → predictions
│   ├── photos/                  # Upload + gallery → Storage
│   ├── guestbook/               # Sign + display
│   ├── admin/                   # Password-protected dashboard
│   ├── qr/                      # Printable QR card
│   └── api/                     # Route handlers (insert / admin / exports)
├── components/                  # Hero, nav, artwork, forms, animations
└── lib/
    ├── site.ts                  # Static event content & programme
    ├── supabase/                # Browser + server clients
    ├── export/                  # CSV + keepsake PDF
    └── types.ts
supabase/schema.sql              # Database + storage setup
```

---

Made with love for Nokulunga's village. 🦒🐘🦁
