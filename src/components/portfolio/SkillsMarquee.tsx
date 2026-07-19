export function SkillsMarquee({ items }: { items: string[] }) {
  const text = items.join(" ✳ ") + " ✳";
  return (
    <div
      id="skills"
      className="overflow-hidden border-t-2 border-ink border-b-2 border-ink bg-accent py-[18px]"
    >
      <div className="animate-marquee flex w-max">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-9 pr-9">
            <span className="font-display text-[clamp(24px,3vw,34px)] whitespace-nowrap text-ink uppercase">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
