# Clay render support — repo changes

NO SQL needed — the clay path is stored in the existing (unused) `tags` column as `clay:<path>`. Ignore/delete `supabase/update-3-clay-render.sql`.

Replace these files (all complete, drop-in):
- `src/lib/supabase/types.ts` — `clayImage` on WorkCard (derived from tags)
- `src/lib/projects.ts` — maps the new column into cards
- `src/components/admin/EditDrawer.tsx` — new "Clay render" upload slot + remove button
- `src/components/admin/Dashboard.tsx` — clay upload wiring + save
- `src/components/portfolio/CompareSlider.tsx` — uses real clay render when set, falls back to grayscale filter otherwise
- `src/components/portfolio/CaseStudy.tsx` — passes `claySrc` to the slider

Interactive hero + frame scrub (new):
- `ReactiveName.tsx` — new; hero name letters lift/skew toward the cursor
- `ScrubImage.tsx` — new; work-card images scrub through 8 lighting frames on hover
- `Hero.tsx` — replaced; uses ReactiveName for the name block (nothing else changed)
- `SelectedWorks.tsx` — replaced; WorkTile uses ScrubImage (keeps CursorZone wiring)

Latest (logo SVG + contact upgrades):
- `public/images/logo.svg` — new; your logo paths recolored to #C95B46 on transparent (the uploaded SVG had its colors stripped)
- `public/wilken.vcf` — new; downloadable contact card
- `Header.tsx` + `admin/Sidebar.tsx` — replaced; use logo.svg (plain <img>, next/image blocks SVG). Delete public/images/wilken-logo.jpg after.
- `ContactFooter.tsx` — replaced; adds WhatsApp row (assumes +63 — edit the "63" prefix in waHref if wrong) and "Save contact card" row; the three shapes + ✳ now animate (bounce / flip / stepped spin)
- `src/app/globals.css` — replaced again; shape keyframes added

Previous (PNG portrait + thicker cursor):
- `public/images/portrait.png` — new transparent-background portrait; delete `public/images/portrait.jpeg`
- `Hero.tsx` — now points at /images/portrait.png
- `CustomCursor.tsx` — thicker ✳ (2px stroke, 20px base)

Portrait + cursor + skills upgrades:
- `public/images/portrait.jpeg` — replaced; background tone-mapped to exact #151515 (your rust outline preserved)
- `Hero.tsx` — replaced; drops the grayscale/blend/glitch layers that were killing the outline color
- `CustomCursor.tsx` — new; site-wide ✳ cursor, grows over links/buttons (desktop only, native cursor on touch)
- `src/app/globals.css` — replaced; cursor:none rules (scoped, desktop only)
- `SkillsGrid.tsx` — replaced; monogram badge pops over each skill chip on hover + animated "Projects Completed" counter (count-up on scroll)
- `src/app/page.tsx` — replaced; mounts CustomCursor, passes PROJECTS_DONE (edit the constant at the top, currently 120)

Add `<CustomCursor />` inside the works page wrapper too if you want the cursor on /works (same one-line import as page.tsx). While you're in `src/app/works/page.tsx`, delete the duplicated `<ContactFooter />` line.

No other changes needed. After deploy: Admin → edit your case-study project → upload the clay render in the new slot → Save.
