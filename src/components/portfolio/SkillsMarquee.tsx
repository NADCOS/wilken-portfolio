"use client";

import { useEffect, useRef, useState } from "react";

export function SkillsMarquee({ items }: { items: string[] }) {
  const text = items.join(" ✳︎ ") + " ✳︎";
  const track = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let boost = 1;
    let raf = 0;
    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(6, Math.max(boost, 1 + Math.abs(y - lastY) / 30));
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const tick = () => {
      boost += (1 - boost) * 0.05;
      track.current?.getAnimations().forEach((a) => {
        a.playbackRate = hoverRef.current ? 0 : boost;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const setHovered = (on: boolean) => {
    hoverRef.current = on;
    setHover(on);
  };

  return (
    <div
      id="skills"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={
        "overflow-hidden border-t-2 border-b-2 border-ink py-[18px] transition-colors duration-200 " +
        (hover ? "bg-ink" : "bg-accent")
      }
    >
      <div ref={track} className="animate-marquee flex w-max">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-9 pr-9">
            <span
              className={
                "font-display text-[clamp(24px,3vw,34px)] whitespace-nowrap uppercase " +
                (hover ? "text-accent" : "text-ink")
              }
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
