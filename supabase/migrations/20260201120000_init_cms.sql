-- LEACO CMS: collections + projects. Run in Supabase SQL Editor or via CLI.
-- Also create bucket "media" (public) in Dashboard → Storage, or use the insert below.

-- Extensions
create extension if not exists "pgcrypto";

-- Storage bucket (public reads for Next/Image)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Anyone can read published images in media
create policy "media_select_public"
on storage.objects for select
using (bucket_id = 'media');

-- Collections (public catalog)
create table public.collections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  subtitle text not null default '',
  category text not null default 'Collection',
  material text not null default '',
  sizes jsonb not null default '[]'::jsonb,
  finish text not null default '',
  price_note text not null default '',
  summary text not null default '',
  story jsonb not null default '[]'::jsonb,
  features jsonb not null default '[]'::jsonb,
  image_src text not null default '',
  image_alt text not null default '',
  shapes text[] not null default '{}',
  finishes text[] not null default '{}',
  scale_tags text[] not null default '{}',
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create index collections_slug_idx on public.collections (slug);
create index collections_published_idx on public.collections (published);

-- Projects gallery
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  body text,
  image_src text not null default '',
  image_alt text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_published_sort_idx on public.projects (published, sort_order);

alter table public.collections enable row level security;
alter table public.projects enable row level security;

-- Public read (anon): published rows only
create policy "collections_select_published"
on public.collections for select
to anon, authenticated
using (published = true);

create policy "projects_select_published"
on public.projects for select
to anon, authenticated
using (published = true);

-- Optional: authenticated users could be restricted further in app via middleware.
-- Writes go through Next.js server actions with service role (bypasses RLS).
