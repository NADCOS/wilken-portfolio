import Link from "next/link";

export function ContactFooter() {
  return (
    <>
      <section
        id="contact"
        className="grid grid-cols-2 border-t-2 border-line"
      >
        <div className="flex flex-col justify-between gap-12 bg-accent px-12 py-14">
          <div className="flex items-start justify-between">
            <h2 className="m-0 font-display text-[64px] leading-none text-ink uppercase">
              Let&apos;s Build
              <br />
              Something
              <br />
              <span className="text-paper">Epic Together</span>
            </h2>
            <div className="font-display text-[44px] text-ink">↗</div>
          </div>
          <div className="flex items-end gap-4">
            <div className="h-[72px] w-[72px] rounded-full bg-ink" />
            <div className="h-9 w-[72px] rounded-t-[36px] bg-ink opacity-55" />
            <div className="h-9 w-9 bg-ink" />
            <div className="ml-auto font-display text-[32px] text-ink">
              ✳
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-[22px] px-12 py-14">
          <a
            href="mailto:eupalaow5@gmail.com"
            className="flex items-center gap-[18px] border-2 border-line px-[22px] py-4 hover:border-accent hover:text-paper"
          >
            <span className="w-16 text-[11px] font-bold tracking-[0.26em] text-accent uppercase">
              Email
            </span>
            <span className="text-[16px] font-medium tracking-[0.06em]">
              eupalaow5@gmail.com
            </span>
          </a>
          <a
            href="tel:0534581911"
            className="flex items-center gap-[18px] border-2 border-line px-[22px] py-4 hover:border-accent hover:text-paper"
          >
            <span className="w-16 text-[11px] font-bold tracking-[0.26em] text-accent uppercase">
              Phone
            </span>
            <span className="text-[16px] font-medium tracking-[0.06em]">
              0534 581 911
            </span>
          </a>
          <a
            href="https://linktr.ee/eupalaow"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[18px] border-2 border-line px-[22px] py-4 hover:border-accent hover:text-paper"
          >
            <span className="w-16 text-[11px] font-bold tracking-[0.26em] text-accent uppercase">
              Socials
            </span>
            <span className="text-[16px] font-medium tracking-[0.06em]">
              linktr.ee/eupalaow
            </span>
          </a>
          <div className="flex items-center gap-[18px] px-[22px]">
            <span className="h-[10px] w-[10px] rounded-full bg-accent" />
            <span className="text-[13px] tracking-[0.24em] text-gray2 uppercase">
              Available for freelance
            </span>
          </div>
        </div>
      </section>

      <footer className="flex items-center justify-between border-t-2 border-line px-12 py-[18px]">
        <div className="text-[12px] tracking-[0.24em] text-gray2 uppercase">
          © 2026 Wilken Eupalao
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
