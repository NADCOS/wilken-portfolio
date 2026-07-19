import Image from "next/image";
import type { WorkCard } from "@/lib/projects";

export function SelectedWorks({ projects }: { projects: WorkCard[] }) {
  return (
    <section
      id="works"
      className="border-b-2 border-line px-12 pt-16 pb-[72px]"
    >
      <div className="mb-10 flex items-end justify-between">
        <h2 className="m-0 font-display text-[88px] leading-[0.95] text-paper uppercase">
          Selected
          <br />
          <span className="text-accent">Works ↗</span>
        </h2>
        <div className="max-w-[260px] text-right text-[13px] tracking-[0.24em] text-gray2 uppercase">
          Renders &amp; digital work — updated from the studio, 2024–2026
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col border-2 border-line hover:border-accent"
          >
            <div className="aspect-[4/3] overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} render`}
                  width={640}
                  height={480}
                  className="block h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface-2 text-[11px] tracking-[0.2em] text-gray2 uppercase">
                  Image coming soon
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t-2 border-line px-5 py-[18px]">
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
        ))}
      </div>
    </section>
  );
}
