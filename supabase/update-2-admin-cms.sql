-- Update 2: full-site content editing + work categories
-- Run in the Supabase SQL editor. Safe to re-run.

-- 1) Projects: work type + featured flag
alter table projects add column if not exists work_type text not null default '3d';
alter table projects add column if not exists featured boolean not null default false;

update projects set featured = true
where title = 'Vela Residence'
  and not exists (select 1 from projects where featured = true);

-- 2) Site content: one row per section (header, hero, skills, caseStudy, contact)
create table if not exists site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

alter table site_content enable row level security;

drop policy if exists "public read content" on site_content;
create policy "public read content" on site_content
  for select using (true);

drop policy if exists "admin write content" on site_content;
create policy "admin write content" on site_content
  for all to authenticated using (true) with check (true);
