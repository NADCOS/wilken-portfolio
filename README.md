# Interactive upgrades — repo changes

New files (copy as-is into `src/components/portfolio/`):
- `CompareSlider.tsx` — clay/final drag slider (client component)
- `CursorZone.tsx` — "VIEW ↗" cursor follower wrapper (client component)

Replaced file:
- `SkillsMarquee.tsx` — now a client component: scroll speeds it up, hover pauses + inverts colors. Same `items` prop, no call-site changes.

## Edit `CaseStudy.tsx` (stays a server component)

Add import:
```tsx
import { CompareSlider } from "./CompareSlider";
```

Replace the image block:
```tsx
<div className="flex-1 basis-[320px] border-b-2 border-ink">
  {project.image && (
    <Image ... />
  )}
</div>
```
with:
```tsx
<div className="relative flex-1 basis-[320px] border-b-2 border-ink">
  {project.image && (
    <CompareSlider src={project.image} alt={project.title + " case study"} />
  )}
</div>
```
The `Image` import in CaseStudy.tsx becomes unused — remove it.

Note: the "clay" side is currently simulated (grayscale filter on the same render). When you have a real clay render, add a `claySrc` prop to CompareSlider and swap the second `<Image>` to it, dropping the filter class.

## Edit `SelectedWorks.tsx` (stays a server component)

Add import:
```tsx
import { CursorZone } from "./CursorZone";
```

Replace the grid wrapper:
```tsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
  {projects.map(...)}
</div>
```
with:
```tsx
<CursorZone className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
  {projects.map((project) => (
    <WorkTile key={project.id} project={project} />
  ))}
</CursorZone>
```

Optionally reuse `CursorZone` around the grid in `WorksIndex.tsx` the same way.

No globals.css, schema, or config changes needed.
