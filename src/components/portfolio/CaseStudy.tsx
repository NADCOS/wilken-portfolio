import Image from "next/image";
import type { WorkCard } from "@/lib/projects";

export function CaseStudy({ project }: { project: WorkCard }) {
  return (
    <section className="grid grid-cols-[120px_480px_1fr_72px] bg-paper text-ink">
      <div className="flex flex-col justify-between bg-accent py-7">
        <div className="mx-auto font-display text-[42px] leading-none text-ink uppercase [writing-mode:vertical-rl] rotate-180">
          Case Study
        </div>
        <div className="text-center font-display text-[30px] text-ink">↗</div>
      </div>
      <div className="border-r-2 border-ink">
        {project.image && (
          <Image
            src={project.image}
            alt={`${project.title} case study`}
            width={480}
            height={640}
            className="block h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-8 px-10 py-11">
        <div>
          <h3 className="m-0 font-display text-[48px] leading-none uppercase">
            {project.title}
          </h3>
          <div className="mt-2 text-[13px] tracking-[0.24em] text-gray-light uppercase">
            Full interior visualization · Private client · 2026
          </div>
        </div>
        <div className="grid grid-cols-3 gap-7">
          <div className="flex flex-col gap-3">
            <div className="h-[34px] w-[34px] bg-accent" />
            <div className="text-[14px] font-bold tracking-[0.2em] uppercase">
              The Challenge
            </div>
            <p
              className="m-0 text-[14px] leading-[1.6] font-light text-body-copy"
              style={{ textWrap: "pretty" }}
            >
              Translate a warm, wood-and-marble concept into photoreal
              imagery convincing enough to sell the design before
              construction.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-[34px] w-[34px] border-[3px] border-accent" />
            <div className="text-[14px] font-bold tracking-[0.2em] uppercase">
              The Solution
            </div>
            <p
              className="m-0 text-[14px] leading-[1.6] font-light text-body-copy"
              style={{ textWrap: "pretty" }}
            >
              Modeled in SketchUp, detailed in 3ds Max, rendered with Corona —
              physically accurate lighting and hand-tuned materials.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-[34px] w-[34px] rounded-full bg-accent" />
            <div className="text-[14px] font-bold tracking-[0.2em] uppercase">
              The Result
            </div>
            <p
              className="m-0 text-[14px] leading-[1.6] font-light text-body-copy"
              style={{ textWrap: "pretty" }}
            >
              Client approved the design in a single review round; renders
              now anchor the developer&apos;s marketing suite.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-ink hover:bg-accent">
        <div className="text-[13px] font-bold tracking-[0.3em] text-paper uppercase [writing-mode:vertical-rl]">
          View Project
        </div>
      </div>
    </section>
  );
}
