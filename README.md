# Clay render support — repo changes

NO SQL needed — the clay path is stored in the existing (unused) `tags` column as `clay:<path>`. Ignore/delete `supabase/update-3-clay-render.sql`.

Replace these files (all complete, drop-in):
- `src/lib/supabase/types.ts` — `clayImage` on WorkCard (derived from tags)
- `src/lib/projects.ts` — maps the new column into cards
- `src/components/admin/EditDrawer.tsx` — new "Clay render" upload slot + remove button
- `src/components/admin/Dashboard.tsx` — clay upload wiring + save
- `src/components/portfolio/CompareSlider.tsx` — uses real clay render when set, falls back to grayscale filter otherwise
- `src/components/portfolio/CaseStudy.tsx` — passes `claySrc` to the slider

No other changes needed. After deploy: Admin → edit your case-study project → upload the clay render in the new slot → Save.
