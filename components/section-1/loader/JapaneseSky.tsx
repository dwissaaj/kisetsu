"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate } from "animejs";

export default function WaveLoading() {
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wave = waveRef.current;
    if (!wave) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const animation = animate(wave, {
      translateX: ["-12px", "12px"],
      duration: 1800,
      ease: "inOutSine",
      alternate: true,
      loop: true,
    });

    return () => {
      animation.pause();
    };
  }, []);

return (
  <div className="relative mx-auto h-10 w-[100px] overflow-hidden">
    <div ref={waveRef} className="relative h-full w-full">
      <Image
        src="/loader/wave.png"
        alt=""
        fill
        priority
        sizes="100px"
        className="object-contain"
      />
    </div>
  </div>
);
}