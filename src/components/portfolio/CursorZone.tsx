"use client";

import { useState } from "react";

export function CursorZone({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [cur, setCur] = useState({ x: 0, y: 0, on: false });

  return (
    <>
      <div
        className={(className ?? "") + " cursor-none"}
        onMouseMove={(e) => setCur({ x: e.clientX, y: e.clientY, on: true })}
        onMouseLeave={() => setCur((c) => ({ ...c, on: false }))}
      >
        {children}
      </div>
      <div
        className="pointer-events-none fixed top-0 left-0 z-[60] transition-opacity duration-150"
        style={{
          transform: `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%)`,
          opacity: cur.on ? 1 : 0,
        }}
      >
        <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-2 border-ink bg-accent font-display text-[15px] tracking-[0.08em] text-ink uppercase">
          View ↗︎
        </div>
      </div>
    </>
  );
}
