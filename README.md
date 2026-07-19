# Wilken Eupalao — Portfolio + Admin CMS

Next.js (App Router) + Tailwind CSS v4 + Framer Motion + Supabase implementation
of the design handoff in `design_handoff_portfolio/` (`Portfolio.dc.html` +
`Admin.dc.html`).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** (CSS-first theme in `src/app/globals.css`: `ink`, `accent`,
  `paper`, `line`, `gray2`, `font-display` / `font-sans`)
- **Framer Motion** — hero fade-up stagger, rotating circular badge
- **Supabase** — Postgres (`projects` table), Auth (single admin user),
  Storage (`project-images` bucket)

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase project values
npm run dev
```

Without Supabase env vars set, the public site still renders using the seed
data baked into `src/lib/projects.ts` (matches the design mock), but `/admin`
will not work — Supabase is required for auth and the CMS.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the SQL editor. It creates the `projects`
   table, RLS policies, the public `project-images` storage bucket, and seeds
   the three mock projects (Vela Residence / Oro Pavilion / Kayu House).
3. **Auth → Providers**: disable email signups (this app has exactly one
   admin account, created manually).
4. **Authentication → Users → Add user**: create the one admin account
   (e.g. `eupalaow5@gmail.com`).
5. Copy the seed render — `design_handoff_portfolio/assets/project_images-1784446622904.jpg`
   (also mirrored at `public/images/vela-residence.jpg`) — into the
   `project-images` bucket at path `seed/vela-residence.jpg` so it matches the
   `image_path` the schema seeds for Vela Residence. Alternatively, re-upload
   it from the admin dashboard's edit drawer once logged in.
6. Copy `.env.local.example` to `.env.local` and fill in your project URL and
   anon key (**Settings → API**).

## Routes

- `/` — public portfolio (`src/app/page.tsx`)
- `/admin/login` — Supabase Auth email/password sign-in
- `/admin` — protected dashboard (projects table + edit drawer), redirects to
  `/admin/login` when signed out (enforced in `src/proxy.ts`)

## Notes

- The parent folder name must not contain `#` — Turbopack misreads it as a
  URL fragment on Windows and the build silently truncates the path. That's
  why this project lives at `WEB/wilken-portfolio` rather than nested inside
  `WEB/# Wilken Portfolio Build/`.
- Design tokens, copy, and spacing were transcribed directly from the two
  `.dc.html` files for pixel fidelity — see `design_handoff_portfolio/README.md`
  for the original handoff brief.
