import Link from "next/link";
import type { SiteContent } from "@/lib/content";

export function ContactFooter({ content }: { content: SiteContent["contact"] }) {
  const telHref = "tel:" + content.phone.replace(/\s+/g, "");
  return (
    <>
      <section
        id="contact"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] border-t-2 border-line"
      >
        <div className="flex flex-col justify-between gap-12 bg-accent px-[clamp(20px,4vw,48px)] py-[clamp(32px,5vw,56px)]">
          <div className="flex items-start justify-between gap-4">
            <h2 className="m-0 font-display text-[clamp(40px,6vw,64px)] leading-none text-ink uppercase">
              {content.headingLine1}
              <br />
              {content.headingLine2}
              <br />
              <span className="text-paper">{content.headingLine3}</span>
            </h2>
            <div className="font-display text-[44px] text-ink">↗︎</div>
          </div>
          <div className="flex items-end gap-4">
            <div className="h-[72px] w-[72px] rounded-full bg-ink" />
            <div className="h-9 w-[72px] rounded-t-[36px] bg-ink opacity-55" />
            <div className="h-9 w-9 bg-ink" />
            <div className="ml-auto font-display text-[32px] text-ink">✳︎</div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-[22px] px-[clamp(20px,4vw,48px)] py-[clamp(32px,5vw,56px)]">
          <a
            href={"mailto:" + content.email}
            className="flex items-center gap-[18px] border-2 border-line px-[22px] py-4 hover:border-accent hover:text-paper"
          >
            <span className="w-16 shrink-0 text-[11px] font-bold tracking-[0.26em] text-accent uppercase">
              Email
            </span>
            <span className="text-[16px] font-medium tracking-[0.06em] [overflow-wrap:anywhere]">
              {content.email}
            </span>
          </a>
          <a
            href={telHref}
            className="flex items-center gap-[18px] border-2 border-line px-[22px] py-4 hover:border-accent hover:text-paper"
          >
            <span className="w-16 shrink-0 text-[11px] font-bold tracking-[0.26em] text-accent uppercase">
              Phone
            </span>
            <span className="text-[16px] font-medium tracking-[0.06em]">
              {content.phone}
            </span>
          </a>
          <a
            href={content.socialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[18px] border-2 border-line px-[22px] py-4 hover:border-accent hover:text-paper"
          >
            <span className="w-16 shrink-0 text-[11px] font-bold tracking-[0.26em] text-accent uppercase">
              Socials
            </span>
            <span className="text-[16px] font-medium tracking-[0.06em] [overflow-wrap:anywhere]">
              {content.socialLabel}
            </span>
          </a>
          <div className="flex items-center gap-[18px] px-[22px]">
            <span className="h-[10px] w-[10px] rounded-full bg-accent" />
            <span className="text-[13px] tracking-[0.24em] text-gray2 uppercase">
              {content.status}
            </span>
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-line px-[clamp(20px,4vw,48px)] py-[18px]">
        <div className="text-[12px] tracking-[0.24em] text-gray2 uppercase">
          {content.copyright}
        </div>
        <Link
          href="/admin"
          className="text-[12px] tracking-[0.24em] text-gray2 uppercase hover:text-accent"
        >
          Admin →
        </Link>
      </footer>
    </>
  );
}
