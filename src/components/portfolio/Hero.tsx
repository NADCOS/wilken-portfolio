"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";
import { ReactiveName } from "./ReactiveName";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export function Hero({ content }: { content: SiteContent["hero"] }) {
  return (
    <section className="px-[clamp(20px,4vw,48px)] pt-[clamp(28px,5vw,56px)]">
      <motion.div className="flex items-center gap-[14px]" {...fadeUp(0)}>
        <div className="font-display text-[26px] leading-none text-accent">✳︎</div>
        <div className="text-[14px] font-semibold tracking-[0.3em] uppercase">
          {content.kicker}
        </div>
      </motion.div>

      <div className="mt-2 flex flex-wrap items-end gap-x-8 gap-y-6">
        <motion.h1
          className="m-0 flex-1 basis-[460px] font-display text-[clamp(64px,13.5vw,196px)] leading-[0.92] tracking-[-0.01em] text-paper uppercase"
          {...fadeUp(0.08)}
        >
          {content.titleWord}
        </motion.h1>
        <motion.div
          className="flex max-w-[280px] flex-1 basis-[200px] flex-col gap-5 pb-[18px]"
          {...fadeUp(0.16)}
        >
          <p
            className="m-0 text-[13px] leading-[1.7] tracking-[0.18em] text-gray2 uppercase"
            style={{ textWrap: "pretty" }}
          >
            {content.blurb}
          </p>
          <div
            className="h-11"
            style={{
              background:
                "repeating-linear-gradient(90deg,#F3F3F3 0 2px,transparent 2px 5px,#F3F3F3 5px 8px,transparent 8px 12px)",
            }}
          />
        </motion.div>
      </div>

      <div className="mt-10 flex flex-wrap gap-[clamp(28px,4vw,48px)]">
        {/* left: name + meta */}
        <div className="flex flex-1 basis-[440px] flex-col justify-between pb-[clamp(24px,4vw,48px)]">
          <motion.div {...fadeUp(0.24)}>
            <div className="flex flex-wrap items-center gap-[clamp(16px,3vw,28px)]">
              <ReactiveName
                firstName={content.firstName}
                lastName={content.lastName}
              />
              <motion.div
                className="relative aspect-square w-[clamp(92px,14vw,120px)] shrink-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 120 120" className="block h-full w-full">
                  <defs>
                    <path
                      id="circ"
                      d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                    />
                  </defs>
                  <text
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11.5px",
                      letterSpacing: "2.5px",
                      fill: "#F3F3F3",
                      textTransform: "uppercase",
                    }}
                  >
                    <textPath href="#circ">
                      Design that connects · spaces to people ·
                    </textPath>
                  </text>
                  <circle
                    cx="60"
                    cy="60"
                    r="26"
                    fill="none"
                    stroke="#C95B46"
                    strokeWidth="2"
                  />
                  <text
                    x="60"
                    y="66"
                    textAnchor="middle"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "18px",
                      fill: "#C95B46",
                    }}
                  >
                    W
                  </text>
                </svg>
              </motion.div>
            </div>
            <div className="mt-[22px] inline-flex items-center gap-3 bg-accent px-[18px] py-[10px] text-[clamp(12px,1.6vw,14px)] font-bold tracking-[0.18em] text-ink uppercase">
              ↗︎ {content.roleChip}
            </div>
          </motion.div>

          <motion.div
            className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 border-t-2 border-line"
            {...fadeUp(0.32)}
          >
            <ul className="m-0 flex list-none flex-col gap-[14px] p-0 pt-7">
              {content.services.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[14px] font-medium tracking-[0.2em] uppercase"
                >
                  <span className="text-accent">→</span> {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-5 pt-7">
              <div className="flex items-center gap-[14px]">
                <div className="h-[10px] w-[10px] bg-accent" />
                <div className="text-[13px] tracking-[0.2em] text-gray2 uppercase">
                  Based in
                  <br />
                  <span className="font-semibold text-paper">{content.basedIn}</span>
                </div>
              </div>
              <div className="flex items-center gap-[14px]">
                <div className="h-[10px] w-[10px] rounded-full bg-paper" />
                <div className="text-[13px] tracking-[0.2em] text-gray2 uppercase">
                  Available for
                  <br />
                  <span className="font-semibold text-paper">
                    {content.availability}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* right: animated portrait on rust block */}
        <motion.div
          className="relative max-w-[520px] flex-1 basis-[320px]"
          {...fadeUp(0.28)}
        >
          <div
            className="absolute top-9 -right-6 bottom-0 left-12 bg-accent"
            style={{ clipPath: "polygon(22% 0,100% 0,100% 100%,0 100%,0 38%)" }}
          />
          <div className="portrait-float relative">
            <Image
              src="/images/portrait.png"
              alt="Wilken Eupalao portrait"
              width={520}
              height={640}
              className="block w-full"
            />
          </div>
          <div className="absolute right-[-14px] bottom-[110px] -rotate-90 origin-[right_bottom] font-display text-[22px] tracking-[0.08em] text-ink uppercase">
            {content.firstName} ✕
          </div>
        </motion.div>
      </div>
    </section>
  );
}
