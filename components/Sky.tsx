"use client";

import { useEffect, useRef } from "react";

// Deterministic so the sky is the same on every visit.
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

// The night sky above the crown: a still field of stars with the northern lights drifting across it.
export default function Sky() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rand = rng(41);
      for (let i = 0; i < Math.min(700, (w * h) / 2600); i++) {
        const big = rand() > 0.95;
        ctx.fillStyle = `rgba(240,236,224,${big ? 0.7 + rand() * 0.3 : 0.15 + rand() * 0.5})`;
        ctx.beginPath();
        ctx.arc(rand() * w, rand() * h, big ? 1 + rand() * 0.5 : 0.3 + rand() * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <div className="sky" aria-hidden="true">
      <canvas ref={canvas} />
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
    </div>
  );
}
