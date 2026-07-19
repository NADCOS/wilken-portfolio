"use client";

import { useRef, useState } from "react";

export function HoverVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string | null;
}) {
  const v = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => {
        v.current?.play();
        setPlaying(true);
      }}
      onMouseLeave={() => {
        v.current?.pause();
        setPlaying(false);
      }}
    >
      <video
        ref={v}
        src={src}
        poster={poster ?? undefined}
        muted
        loop
        playsInline
        preload="metadata"
        className="block h-full w-full object-cover"
      />
      <div
        className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center border-2 border-ink bg-accent font-display text-[14px] text-ink transition-opacity duration-150"
        style={{ opacity: playing ? 0 : 1 }}
      >
        ▶
      </div>
    </div>
  );
}
