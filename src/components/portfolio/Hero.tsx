"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export function Hero() {
  return (
    <section className="px-12 pt-14">
      <motion.div className="flex items-center gap-[14px]" {...fadeUp(0)}>
        <div className="font-display text-[26px] leading-none text-accent">
          ✳
        </div>
        <div className="text-[14px] font-semibold tracking-[0.3em] uppercase">
          3D Designer — Portfolio 2026
        </div>
      </motion.div>

      <div className="mt-2 grid grid-cols-[1fr_240px] items-end gap-8">
        <motion.h1
          className="m-0 font-display text-[196px] leading-[0.92] tracking-[-0.01em] text-paper uppercase"
          {...fadeUp(0.08)}
        >
          Portfolio
        </motion.h1>
        <motion.div
          className="flex flex-col gap-5 pb-[18px]"
          {...fadeUp(0.16)}
        >
          <p
            className="m-0 text-[13px] leading-[1.7] tracking-[0.18em] text-gray2 uppercase"
            style={{ textWrap: "pretty" }}
          >
            I build photoreal spaces and bold web experiences that are
            impossible to ignore.
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

      <div className="mt-10 grid grid-cols-[1fr_520px] gap-12">
        {/* left: name + meta */}
        <div className="flex flex-col justify-between pb-12">
          <motion.div {...fadeUp(0.24)}>
            <div className="flex items-center gap-7">
              <div>
                <div className="font-display text-[72px] leading-none text-paper uppercase">
                  Wilken
                </div>
                <div className="font-display text-[72px] leading-none text-accent uppercase">
                  Eupalao
                </div>
              </div>
              <motion.div
                className="relative h-[120px] w-[120px] shrink-0"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "linear",
                }}
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
            <div className="mt-[22px] inline-flex items-center gap-3 bg-accent px-[18px] py-[10px] text-[14px] font-bold tracking-[0.18em] text-ink uppercase">
              ↗ 3D Designer, Architectural Visualizer &amp; Web Developer
            </div>
          </motion.div>

          <motion.div
            className="mt-11 grid grid-cols-2 gap-0 border-t-2 border-line"
            {...fadeUp(0.32)}
          >
            <ul className="m-0 flex list-none flex-col gap-[14px] border-r-2 border-line py-0 pt-7 pr-6 pl-0">
              {[
                "3D Visualization",
                "Architectural Renders",
                "Web Development",
                "UI/UX Design",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[14px] font-medium tracking-[0.2em] uppercase"
                >
                  <span className="text-accent">→</span> {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-5 py-0 pt-7 pr-0 pl-8">
              <div className="flex items-center gap-[14px]">
                <div className="h-[10px] w-[10px] bg-accent" />
                <div className="text-[13px] tracking-[0.2em] text-gray2 uppercase">
                  Based in
                  <br />
                  <span className="font-semibold text-paper">
                    the Philippines
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-[14px]">
                <div className="h-[10px] w-[10px] rounded-full bg-paper" />
                <div className="text-[13px] tracking-[0.2em] text-gray2 uppercase">
                  Available for
                  <br />
                  <span className="font-semibold text-paper">Freelance</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* right: portrait on rust block */}
        <motion.div className="relative" {...fadeUp(0.28)}>
          <div
            className="absolute top-9 -right-12 bottom-0 left-[60px] bg-accent"
            style={{
              clipPath: "polygon(22% 0,100% 0,100% 100%,0 100%,0 38%)",
            }}
          />
          <Image
            src="/images/portrait.jpeg"
            alt="Wilken Eupalao portrait"
            width={520}
            height={640}
            className="relative block w-full grayscale mix-blend-multiply contrast-[1.06]"
          />
          <div className="absolute right-[-24px] bottom-[110px] -rotate-90 origin-[right_bottom] font-display text-[22px] tracking-[0.08em] text-ink uppercase">
            Wilken ✕
          </div>
        </motion.div>
      </div>
    </section>
  );
}
