import Image from "next/image";

export function Header() {
  return (
    <header className="grid grid-cols-[1fr_auto] items-stretch border-b-2 border-line">
      <div className="flex items-center gap-4 px-12 py-5">
        <Image
          src="/images/wilken-logo.jpg"
          alt="Wilken logo"
          width={44}
          height={44}
          className="block h-11 w-11 object-cover"
        />
        <div className="text-[14px] font-semibold tracking-[0.28em] uppercase">
          Wilken Eupalao
        </div>
        <div className="h-[6px] w-[6px] bg-accent" />
        <div className="text-[13px] tracking-[0.24em] text-gray2 uppercase">
          3D Designer · ArchViz · Web Dev
        </div>
      </div>
      <nav className="flex items-stretch">
        <a
          href="#works"
          className="flex items-center border-l-2 border-line px-7 text-[13px] font-semibold tracking-[0.22em] uppercase hover:bg-accent hover:text-ink"
        >
          Works
        </a>
        <a
          href="#skills"
          className="flex items-center border-l-2 border-line px-7 text-[13px] font-semibold tracking-[0.22em] uppercase hover:bg-accent hover:text-ink"
        >
          Skills
        </a>
        <a
          href="#contact"
          className="flex items-center gap-[10px] border-l-2 border-line bg-accent px-8 text-[13px] font-bold tracking-[0.22em] text-ink uppercase hover:bg-paper"
        >
          Contact <span className="font-display text-[16px]">↗</span>
        </a>
      </nav>
    </header>
  );
}
