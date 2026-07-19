"use client";

import Image from "next/image";
import { useState } from "react";

const FRAMES = 8;

export function ScrubImage({ src, alt }: { src: string; alt: string }) {
  const [scrub, setScrub] = useState<number | null>(null);
  const frame =
    scrub == null ? null : Math.min(FRAMES - 1, Math.floor(scrub * FRAMES));
  const q = frame == null ? 1 : frame / (FRAMES - 1);
  const shown = (frame ?? FRAMES - 1) + 1;

  return (
    <div
      className="h-full w-full"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setScrub(Math.max(0, Math.min(0.999, (e.clientX - r.left) / r.width)));
      }}
      onMouseLeave={() => setScrub(null)}
    >
      <Image
        src={src}
        alt={alt}
        width={640}
        height={480}
        className="block h-full w-full object-cover"
        style={{
          filter:
            frame == null
              ? undefined
              : `brightness(${(0.55 + q * 0.65).toFixed(2)}) sepia(${((1 - q) * 0.45).toFixed(2)}) hue-rotate(${(-(1 - q) * 18).toFixed(0)}deg) saturate(${(1 + (1 - q) * 0.4).toFixed(2)})`,
        }}
      />
      <div
        className="absolute top-3 right-3 bg-ink px-[10px] py-[6px] text-[11px] font-bold tracking-[0.22em] text-paper uppercase transition-opacity duration-150"
        style={{ opacity: frame == null ? 0 : 1 }}
      >
        Frame {String(shown).padStart(2, "0")} / {String(FRAMES).padStart(2, "0")}
      </div>
      <div
        className="absolute bottom-0 left-0 h-[3px] bg-accent"
        style={{
          width: `${(shown / FRAMES) * 100}%`,
          opacity: frame == null ? 0 : 1,
        }}
      />
    </div>
  );
}
