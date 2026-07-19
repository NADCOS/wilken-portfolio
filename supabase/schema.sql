-- Wilken Eupalao Portfolio — Supabase schema
-- Run in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists pgcrypto;

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,          -- sub-label, e.g. "Interior Render · Corona"
  client text,
  description text,
  image_path text,        -- Supabase Storage path (bucket: project-images)
  tags text[],
  is_case_study boolean default false,
  published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table projects enable row level security;

drop policy if exists "public read published" on projects;
create policy "public read published" on projects
  for select using (published = true);

drop policy if exists "owner full access" on projects;
create policy "owner full access" on projects
  for all using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- Storage bucket for project renders. Public read, authenticated write.
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "public read project images" on storage.objects;
create policy "public read project images" on storage.objects
  for select using (bucket_id = 'project-images');

drop policy if exists "authenticated write project images" on storage.objects;
create policy "authenticated write project images" on storage.objects
  for insert to authenticated with check (bucket_id = 'project-images');

drop policy if exists "authenticated update project images" on storage.objects;
create policy "authenticated update project images" on storage.objects
  for update to authenticated using (bucket_id = 'project-images');

drop policy if exists "authenticated delete project images" on storage.objects;
create policy "authenticated delete project images" on storage.objects
  for delete to authenticated using (bucket_id = 'project-images');

-- Seed data (matches the design handoff mock). Safe to re-run.
insert into projects (title, category, client, description, image_path, is_case_study, published, sort_order)
select 'Vela Residence', 'Interior Render · Corona', 'Private client',
  'Full interior visualization — SketchUp, 3ds Max, Corona.',
  'seed/vela-residence.jpg', true, true, 0
where not exists (select 1 from projects where title = 'Vela Residence');

insert into projects (title, category, client, description, image_path, is_case_study, published, sort_order)
select 'Oro Pavilion', 'Commercial Render · V-Ray', 'Oro Development',
  'Commercial exterior & lobby renders in V-Ray.',
  null, false, true, 1
where not exists (select 1 from projects where title = 'Oro Pavilion');

insert into projects (title, category, client, description, image_path, is_case_study, published, sort_order)
select 'Kayu House', 'Exterior Render · 3ds Max', 'Studio Kayu',
  'Dusk exterior series, 3ds Max + Corona.',
  null, false, false, 2
where not exists (select 1 from projects where title = 'Kayu House');

-- Auth: disable public signups in Project Settings → Auth → Providers,
-- then create the one admin account manually (Authentication → Users → Add user).
