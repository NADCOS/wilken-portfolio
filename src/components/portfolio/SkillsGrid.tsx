"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/lib/content";

const MONOGRAMS: Record<string, string> = {
  sketchup: "SU",
  "3ds max": "3DS",
  autocad: "AC",
  "v-ray": "VR",
  "corona renderer": "CR",
  corona: "CR",
  webflow: "WF",
  "ui/ux design": "UX",
  "website design": "WEB",
  "adobe products": "AI+PS",
  "ai tools": "AI",
  branding: "BR",
};

function monogram(skill: string) {
  return (
    MONOGRAMS[skill.toLowerCase().trim()] ??
    skill.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase()
  );
}

function SkillChip({ skill, inverted }: { skill: string; inverted?: boolean }) {
  return (
    <div
      className={
        "group relative flex items-center gap-3 border-2 px-[22px] py-3 text-[15px] tracking-[0.18em] uppercase " +
        (inverted
          ? "border-accent bg-accent font-bold text-ink hover:border-paper hover:bg-paper"
          : "border-paper font-semibold hover:border-accent hover:bg-accent hover:text-ink")
      }
    >
      <span className={"h-2 w-2 rounded-full " + (inverted ? "bg-ink" : "bg-accent group-hover:bg-ink")} />
      {skill}
      <div className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-10 flex h-12 min-w-12 -translate-x-1/2 scale-0 rotate-[-8deg] items-center justify-center border-2 border-paper bg-ink px-2 font-display text-[18px] tracking-[0.06em] text-accent transition-transform duration-150 ease-out group-hover:scale-100 group-hover:rotate-0">
        {monogram(skill)}
      </div>
    </div>
  );
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(value * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return <span ref={ref}>{n}</span>;
}

export function SkillsGrid({
  content,
  projectsDone,
}: {
  content: SiteContent["skills"];
  projectsDone: number;
}) {
  return (
    <section className="border-b-2 border-line px-[clamp(20px,4vw,48px)] py-[clamp(36px,6vw,64px)]">
      <div className="flex flex-wrap gap-[clamp(24px,4vw,48px)]">
        <h2 className="m-0 basis-[380px] font-display text-[clamp(48px,8vw,76px)] leading-[0.95] text-paper uppercase">
          Skills
          <br />
          I Use <span className="text-accent">✳︎</span>
        </h2>
        <div className="flex flex-1 basis-[400px] flex-wrap content-center gap-4">
          {content.chips.map((skill) => (
            <SkillChip key={skill} skill={skill} />
          ))}
          {content.highlight && <SkillChip skill={content.highlight} inverted />}
        </div>
      </div>

      <div className="mt-[clamp(32px,5vw,52px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t-2 border-line pt-[clamp(24px,4vw,36px)]">
        <div className="flex items-baseline gap-4">
          <div className="font-display text-[clamp(64px,10vw,120px)] leading-none text-accent">
            <CountUp value={projectsDone} />
            <span className="text-paper">+</span>
          </div>
          <div className="max-w-[220px] text-[13px] leading-[1.6] font-semibold tracking-[0.24em] text-gray2 uppercase">
            Projects
            <br />
            Completed
          </div>
        </div>
        <div className="pb-2 text-[13px] tracking-[0.24em] text-gray2 uppercase">
          2016 — 2026 · 3D · Web · Brand
        </div>
      </div>
    </section>
  );
}
