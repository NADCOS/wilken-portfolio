import Link from "next/link";
import type { WorkCard } from "@/lib/projects";
import type { SiteContent } from "@/lib/content";
import { CompareSlider } from "./CompareSlider";

export function CaseStudy({
  project,
  content,
}: {
  project: WorkCard;
  content: SiteContent["caseStudy"];
}) {
  const blocks = [
    { marker: "bg-accent", label: "The Challenge", copy: content.challenge },
    { marker: "border-[3px] border-accent", label: "The Solution", copy: content.solution },
    { marker: "rounded-full bg-accent", label: "The Result", copy: content.result },
  ];
  return (
    <section className="bg-paper text-ink">
      <div className="flex items-center justify-between gap-4 bg-accent px-[clamp(20px,4vw,48px)] py-[14px]">
        <div className="font-display text-[clamp(26px,4vw,42px)] leading-none text-ink uppercase">
          Case Study
        </div>
        <div className="font-display text-[30px] text-ink">↗︎</div>
      </div>
      <div className="flex flex-wrap">
        <div className="relative flex-1 basis-[320px] border-b-2 border-ink">
          {project.image && (
            <CompareSlider src={project.image} alt={project.title + " case study"} />
          )}
        </div>
        <div className="flex grow-[2] basis-[420px] flex-col gap-8 border-b-2 border-ink px-[clamp(20px,4vw,40px)] py-[clamp(28px,4vw,44px)]">
          <div>
            <h3 className="m-0 font-display text-[clamp(32px,5vw,48px)] leading-none uppercase">
              {project.title}
            </h3>
            <div className="mt-2 text-[13px] tracking-[0.24em] text-gray-light uppercase">
              {content.meta}
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7">
            {blocks.map((b) => (
              <div key={b.label} className="flex flex-col gap-3">
                <div className={"h-[34px] w-[34px] " + b.marker} />
                <div className="text-[14px] font-bold tracking-[0.2em] uppercase">
                  {b.label}
                </div>
                <p
                  className="m-0 text-[14px] leading-[1.6] font-light text-body-copy"
                  style={{ textWrap: "pretty" }}
                >
                  {b.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link
        href="/works"
        className="flex items-center justify-center gap-3 bg-ink p-[18px] text-[13px] font-bold tracking-[0.3em] text-paper uppercase hover:bg-accent hover:text-ink"
      >
        View Project <span className="font-display text-[18px]">→</span>
      </Link>
    </section>
  );
}
