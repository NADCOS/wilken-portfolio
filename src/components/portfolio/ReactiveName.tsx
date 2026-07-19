"use client";

import { useState } from "react";

function Row({
  word,
  mx,
  className,
}: {
  word: string;
  mx: number | null;
  className: string;
}) {
  return (
    <div
      className={
        "flex font-display text-[clamp(48px,8vw,72px)] leading-none uppercase " +
        className
      }
    >
      {word.split("").map((ch, i) => {
        let t: string | undefined;
        if (mx != null) {
          const d = mx - (i + 0.5) / word.length;
          const inf = Math.exp(-(d * d) / 0.03);
          t =
            `translateY(${(-inf * 12).toFixed(1)}px) ` +
            `skewX(${(-d * inf * 24).toFixed(1)}deg) ` +
            `scaleY(${(1 + inf * 0.12).toFixed(3)})`;
        }
        return (
          <span
            key={i}
            className="inline-block origin-bottom transition-transform duration-150 ease-out"
            style={{ transform: t }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </div>
  );
}

export function ReactiveName({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const [mx, setMx] = useState<number | null>(null);
  return (
    <div
      className="cursor-default"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMx((e.clientX - r.left) / r.width);
      }}
      onMouseLeave={() => setMx(null)}
    >
      <Row word={firstName} mx={mx} className="text-paper" />
      <Row word={lastName} mx={mx} className="text-accent" />
    </div>
  );
}
