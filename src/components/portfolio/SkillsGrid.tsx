import type { SiteContent } from "@/lib/content";

export function SkillsGrid({ content }: { content: SiteContent["skills"] }) {
  return (
    <section className="flex flex-wrap gap-[clamp(24px,4vw,48px)] border-b-2 border-line px-[clamp(20px,4vw,48px)] py-[clamp(36px,6vw,64px)]">
      <h2 className="m-0 basis-[380px] font-display text-[clamp(48px,8vw,76px)] leading-[0.95] text-paper uppercase">
        Skills
        <br />
        I Use <span className="text-accent">✳︎</span>
      </h2>
      <div className="flex flex-1 basis-[400px] flex-wrap content-center gap-4">
        {content.chips.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-3 border-2 border-paper px-[22px] py-3 text-[15px] font-semibold tracking-[0.18em] uppercase hover:border-accent hover:bg-accent hover:text-ink"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            {skill}
          </div>
        ))}
        {content.highlight && (
          <div className="flex items-center gap-3 border-2 border-accent bg-accent px-[22px] py-3 text-[15px] font-bold tracking-[0.18em] text-ink uppercase hover:border-paper hover:bg-paper">
            <span className="h-2 w-2 rounded-full bg-ink" />
            {content.highlight}
          </div>
        )}
      </div>
    </section>
  );
}
