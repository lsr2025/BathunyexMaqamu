-- ══════════════════════════════════════════════════════════════════════
--  Nokulunga's Journey to MammaLand — Supabase Schema
--  Run this in the Supabase SQL Editor (or via the CLI) once per project.
-- ══════════════════════════════════════════════════════════════════════

-- Helpful extension for UUID generation (usually pre-enabled on Supabase).
create extension if not exists "pgcrypto";

-- ──────────────────────────────────────────────────────────────────────
--  PAGE 3 · Messages to Mommy
-- ──────────────────────────────────────────────────────────────────────
create table if not exists public.messages_to_mommy (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  relationship  text,
  message       text not null,
  created_at    timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────────────────
--  PAGE 4 · Letters to Baby
-- ──────────────────────────────────────────────────────────────────────
create table if not exists public.letters_to_baby (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  letter      text not null,
  created_at  timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────────────────
--  PAGE 5 · Baby Predictions
-- ──────────────────────────────────────────────────────────────────────
create table if not exists public.predictions (
  id              uuid primary key default gen_random_uuid(),
  guest_name      text not null,
  arrival_date    date,
  weight          text,
  looks_like      text check (looks_like in ('Mommy', 'Daddy', 'Both')),
  first_word      text,
  future_career   text,
  special_wish    text,
  created_at      timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────────────────
--  PAGE 6 · Photo & Video Memories (metadata; files live in Storage)
-- ──────────────────────────────────────────────────────────────────────
create table if not exists public.photo_memories (
  id            uuid primary key default gen_random_uuid(),
  uploader_name text,
  caption       text,
  file_path     text not null,          -- path within the storage bucket
  public_url    text not null,          -- convenience public URL
  media_type    text not null check (media_type in ('image', 'video')),
  created_at    timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────────────────
--  PAGE 7 · Digital Guestbook
-- ──────────────────────────────────────────────────────────────────────
create table if not exists public.guestbook (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- ══════════════════════════════════════════════════════════════════════
--  Row Level Security
--  Anonymous guests may INSERT into every table (public submissions).
--  Public SELECT is granted only where entries are displayed on-site
--  (guestbook + photo gallery). All private submissions are read by the
--  admin panel using the service-role key, which bypasses RLS.
-- ══════════════════════════════════════════════════════════════════════
alter table public.messages_to_mommy enable row level security;
alter table public.letters_to_baby   enable row level security;
alter table public.predictions        enable row level security;
alter table public.photo_memories     enable row level security;
alter table public.guestbook           enable row level security;

-- INSERT policies (anon + authenticated)
create policy "anon insert messages"   on public.messages_to_mommy for insert to anon, authenticated with check (true);
create policy "anon insert letters"    on public.letters_to_baby   for insert to anon, authenticated with check (true);
create policy "anon insert predictions" on public.predictions       for insert to anon, authenticated with check (true);
create policy "anon insert photos"     on public.photo_memories    for insert to anon, authenticated with check (true);
create policy "anon insert guestbook"  on public.guestbook          for insert to anon, authenticated with check (true);

-- Public SELECT policies (only for content shown publicly on the site)
create policy "public read guestbook" on public.guestbook       for select to anon, authenticated using (true);
create policy "public read photos"    on public.photo_memories  for select to anon, authenticated using (true);

-- ══════════════════════════════════════════════════════════════════════
--  Storage bucket for photo & video memories
-- ══════════════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public)
values ('memories', 'memories', true)
on conflict (id) do nothing;

-- Allow anonymous guests to upload to the memories bucket.
create policy "anon upload memories"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'memories');

-- Allow anyone to read memory files (public gallery).
create policy "public read memories"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'memories');
