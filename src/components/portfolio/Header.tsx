import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/content";

const CELL =
  "flex items-center border-l-2 border-line px-[clamp(16px,2.5vw,28px)] py-4 text-[13px] font-semibold tracking-[0.22em] uppercase hover:bg-accent hover:text-ink";
const CONTACT_CELL =
  "flex items-center gap-[10px] border-l-2 border-line bg-accent px-[clamp(18px,3vw,32px)] py-4 text-[13px] font-bold tracking-[0.22em] text-ink uppercase hover:bg-paper";

export function Header({
  content,
  variant = "home",
}: {
  content: SiteContent["header"];
  variant?: "home" | "works";
}) {
  return (
    <header className="flex flex-wrap items-stretch border-b-2 border-line">
      <div className="flex flex-1 basis-[320px] flex-wrap items-center gap-[14px] px-[clamp(20px,4vw,48px)] py-4">
        <Image
          src="/images/wilken-logo.jpg"
          alt="Wilken logo"
          width={44}
          height={44}
          className="block h-11 w-11 object-cover"
        />
        <div className="text-[14px] font-semibold tracking-[0.28em] uppercase">
          {content.name}
        </div>
        <div className="h-[6px] w-[6px] bg-accent" />
        <div className="text-[13px] tracking-[0.24em] text-gray2 uppercase">
          {content.tagline}
        </div>
      </div>
      <nav className="ml-auto flex flex-wrap items-stretch">
        {variant === "home" ? (
          <>
            <Link href="/works" className={CELL}>
              Works
            </Link>
            <a href="#skills" className={CELL}>
              Skills
            </a>
            <a href="#contact" className={CONTACT_CELL}>
              Contact <span className="font-display text-[16px]">↗</span>
            </a>
          </>
        ) : (
          <>
            <Link href="/" className={CELL}>
              <span className="mr-[10px] font-display text-[16px]">←</span> Home
            </Link>
            <a href="#contact" className={CONTACT_CELL}>
              Contact <span className="font-display text-[16px]">↗</span>
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
