-- Public inquiries from /contact. Inserts use service role (Next.js server action); reads are admin-only via service role.

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null default '',
  role text not null default '',
  email text not null,
  phone text not null,
  city text not null default '',
  project_type text not null default '',
  quantity text not null default '',
  message text not null default ''
);

create index inquiries_created_at_idx on public.inquiries (created_at desc);

alter table public.inquiries enable row level security;
