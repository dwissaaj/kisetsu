
"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import BrushBackground from "./BrushFlower";
import PetalMove from "./PetalMove";

export default function FlowerBackground() {
  const leftFlowerRef = useRef<HTMLDivElement>(null);
  const rightFlowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animations = [
      leftFlowerRef.current &&
        animate(leftFlowerRef.current, {
          clipPath: [
            "inset(100% 0 0 0)",
            "inset(0% 0 0 0)",
          ],
          duration: 2500,
          delay: 200,
          ease: "inOut(2)",
        }),

      // 13.png — Center right, reveal from right to left
rightFlowerRef.current &&
  animate(rightFlowerRef.current, {
    clipPath: [
      "inset(0 0 0 100%)",
      "inset(0 0 0 0%)",
    ],
    duration: 2500,
    delay: 200,
    ease: "inOut(2)",
  }),
    ];

    return () => {
      animations.forEach((animation) => {
        animation?.revert();
      });
    };
  }, []);

  return (
    <>
      {/* 11.png — Bottom left */}
      <div
        ref={leftFlowerRef}
        className="pointer-events-none fixed bottom-0 left-0 z-0 w-[clamp(180px,28vw,420px)]"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      >
        {/* <Image
          src="/loader/13.png"
          alt=""
          width={600}
          height={800}
          priority
          className="h-auto w-full object-contain"
        /> */}
        <PetalMove />
      </div>

      {/* 13.png — Center right / upper area */}
      <div
        ref={rightFlowerRef}
        className="pointer-events-none fixed right-0 top-1/2 z-0 w-[clamp(140px,22vw,320px)] -translate-y-1/2"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      >
        {/* <Image
          src="/loader/11.png"
          alt=""
          width={600}
          height={800}
          priority
          className="h-auto w-full object-contain"
        /> */}
        <BrushBackground />
      </div>
    </>
  );
}
