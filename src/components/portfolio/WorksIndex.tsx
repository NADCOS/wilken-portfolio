"use client";

import { useState } from "react";
import type { WorkCard, WorkType } from "@/lib/supabase/types";
import { WorkTile } from "@/components/portfolio/SelectedWorks";

const FILTERS: { key: WorkType | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "3d", label: "3D Render" },
  { key: "web", label: "Website Design" },
  { key: "brand", label: "Branding" },
];

export function WorksIndex({ projects }: { projects: WorkCard[] }) {
  const [filter, setFilter] = useState<WorkType | "all">("all");
  const visible = projects.filter(
    (p) => filter === "all" || p.workType === filter,
  );
  const count = String(projects.length).padStart(2, "0");

  return (
    <section className="px-[clamp(20px,4vw,48px)] pt-[clamp(28px,5vw,56px)] pb-[clamp(40px,6vw,72px)]">
      <div className="flex items-center gap-[14px]">
        <div className="font-display text-[26px] leading-none text-accent">✳︎</div>
        <div className="text-[14px] font-semibold tracking-[0.3em] uppercase">
          Selected Works — Full Index
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-5">
        <h1 className="m-0 font-display text-[clamp(60px,12vw,160px)] leading-[0.92] tracking-[-0.01em] text-paper uppercase">
          All Works <span className="text-accent">↗︎</span>
        </h1>
        <div className="pb-[14px] text-[13px] tracking-[0.24em] text-gray2 uppercase">
          {count} Projects · 3D · Web · Brand
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3 border-b-2 border-line pb-[clamp(28px,5vw,44px)]">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={
              "flex cursor-pointer items-center border-2 px-6 py-3 text-[14px] font-bold tracking-[0.2em] uppercase " +
              (filter === f.key
                ? "border-accent bg-accent text-ink"
                : "border-paper bg-transparent text-paper hover:border-accent hover:text-accent")
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-[clamp(28px,5vw,44px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
        {visible.map((project) => (
          <WorkTile key={project.id} project={project} />
        ))}
      </div>
      {visible.length === 0 && (
        <div className="mt-10 border-2 border-line p-10 text-center text-[13px] tracking-[0.24em] text-gray2 uppercase">
          No projects in this category yet.
        </div>
      )}
    </section>
  );
}
