"use client";

import Image from "next/image";
import { useState } from "react";

export function CompareSlider({
  src,
  claySrc,
  alt,
}: {
  src: string;
  claySrc?: string | null;
  alt: string;
}) {
  const [pos, setPos] = useState(55);

  const drag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.type === "pointermove" && e.buttons !== 1) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const r = e.currentTarget.getBoundingClientRect();
    setPos(Math.max(2, Math.min(98, ((e.clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      onPointerDown={drag}
      onPointerMove={drag}
      className="relative h-full min-h-[280px] w-full cursor-ew-resize touch-none overflow-hidden select-none"
    >
      <Image src={src} alt={alt} fill className="object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={claySrc ?? src}
          alt=""
          aria-hidden
          fill
          className={
            "object-cover" +
            (claySrc ? "" : " [filter:grayscale(1)_contrast(0.85)_brightness(1.25)]")
          }
          draggable={false}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-[3px] -translate-x-1/2 bg-accent"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-ink bg-accent font-display text-[15px] text-ink">
          ↔︎
        </div>
      </div>
      <div className="absolute top-3 left-3 bg-ink px-[9px] py-[5px] text-[11px] font-bold tracking-[0.22em] text-paper uppercase">
        Clay
      </div>
      <div className="absolute top-3 right-3 bg-accent px-[9px] py-[5px] text-[11px] font-bold tracking-[0.22em] text-ink uppercase">
        Final
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-ink px-[10px] py-1 text-[10px] tracking-[0.26em] whitespace-nowrap text-gray2 uppercase">
        ← Drag →
      </div>
    </div>
  );
}
