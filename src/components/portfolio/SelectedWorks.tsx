import Image from "next/image";
import Link from "next/link";
import type { WorkCard } from "@/lib/supabase/types";
import { WORK_TYPE_LABELS } from "@/lib/supabase/types";

export function WorkTile({ project }: { project: WorkCard }) {
  return (
    <div className="group flex flex-col border-2 border-line hover:border-accent">
      <div className="relative aspect-[4/3] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={640}
            height={480}
            className="block h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-2 text-[11px] tracking-[0.2em] text-gray2 uppercase">
            Image coming soon
          </div>
        )}
        <div className="absolute top-3 left-3 bg-accent px-[10px] py-[6px] text-[11px] font-bold tracking-[0.22em] text-ink uppercase">
          {WORK_TYPE_LABELS[project.workType]}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t-2 border-line px-5 py-[18px]">
        <div>
          <div className="font-display text-[22px] tracking-[0.04em] text-accent uppercase">
            {project.title}
          </div>
          <div className="mt-1 text-[12px] tracking-[0.24em] text-gray2 uppercase">
            {project.category}
          </div>
        </div>
        <div className="font-display text-[20px] text-paper">→</div>
      </div>
    </div>
  );
}

export function SelectedWorks({ projects }: { projects: WorkCard[] }) {
  return (
    <section
      id="works"
      className="border-b-2 border-line px-[clamp(20px,4vw,48px)] pt-[clamp(36px,6vw,64px)] pb-[clamp(40px,6vw,72px)]"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <h2 className="m-0 font-display text-[clamp(48px,8vw,88px)] leading-[0.95] text-paper uppercase">
          Selected
          <br />
          <span className="text-accent">Works ↗</span>
        </h2>
        <div className="flex flex-col items-end gap-[14px]">
          <div className="max-w-[260px] text-right text-[13px] tracking-[0.24em] text-gray2 uppercase">
            3D renders, websites & brands — 2024–2026
          </div>
          <Link
            href="/works"
            className="inline-flex items-center gap-[10px] bg-accent px-5 py-3 text-[13px] font-bold tracking-[0.22em] text-ink uppercase hover:bg-paper"
          >
            All Works →
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
        {projects.map((project) => (
          <WorkTile key={project.id} project={project} />
        ))}
      </div>
      <Link
        href="/works"
        className="mt-6 flex items-center justify-center gap-[14px] border-2 border-line p-[18px] text-[13px] font-bold tracking-[0.3em] uppercase hover:border-accent hover:bg-accent hover:text-ink"
      >
        View All Works — 3D · Web · Branding
        <span className="font-display text-[18px]">→</span>
      </Link>
    </section>
  );
}
