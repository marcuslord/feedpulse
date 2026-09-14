-- Run this entire file in your Supabase SQL Editor to set up FeedPulse

create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text not null,
  content text,
  image_url text,
  source_name text not null,
  source_url text not null,
  category text not null,
  author text,
  published_at timestamptz not null,
  created_at timestamptz default now(),
  views integer default 0
);

-- Index for fast category filtering
create index if not exists articles_category_idx on articles(category);

-- Index for fast slug lookup (article pages)
create index if not exists articles_slug_idx on articles(slug);

-- Index for sorting by date
create index if not exists articles_published_at_idx on articles(published_at desc);

-- Allow public read access
alter table articles enable row level security;

create policy "Articles are publicly readable"
  on articles for select
  using (true);

create policy "Service role can insert and update"
  on articles for all
  using (auth.role() = 'service_role');
