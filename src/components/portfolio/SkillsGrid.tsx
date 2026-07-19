const SKILLS = [
  "SketchUp",
  "3ds Max",
  "AutoCAD",
  "V-Ray",
  "Corona Renderer",
  "Webflow",
  "UI/UX Design",
];

export function SkillsGrid() {
  return (
    <section className="grid grid-cols-[380px_1fr] gap-12 border-b-2 border-line px-12 py-16">
      <h2 className="m-0 font-display text-[76px] leading-[0.95] text-paper uppercase">
        Skills
        <br />
        I Use <span className="text-accent">✳</span>
      </h2>
      <div className="flex flex-wrap content-center gap-4">
        {SKILLS.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-3 border-2 border-paper px-[22px] py-3 text-[15px] font-semibold tracking-[0.18em] uppercase hover:border-accent hover:bg-accent hover:text-ink"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
