"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";

const patterns = [
  { x: 0, y: 0 },
  { x: 105, y: 0 },
  { x: 210, y: 0 },
  { x: 52, y: 20 },
  { x: 157, y: 30 },
];

export default function PatternDecoration() {
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    if (!mediaQuery.matches) return;

    const items = patternRef.current?.querySelectorAll(".pattern-item");
    const flowers = patternRef.current?.querySelectorAll(".flower-item");

    if (!items?.length || !flowers?.length) return;

    const animations: ReturnType<typeof animate>[] = [];

    // Clouds entrance - wait 5 seconds
    const entrance = animate(items, {
      translateY: ["120%", "0%"],
      opacity: [0, 1],
      duration: 1800,
      delay: 5000,
      ease: "out(3)",

      onComplete: () => {
        // Clouds move left and right
        items.forEach((item, index) => {
          animations.push(
            animate(item, {
              translateX: [0, index % 2 === 0 ? -3 : 3, 0],
              duration: 6000 + index * 500,
              ease: "inOut(2)",
              loop: true,
            })
          );
        });

        // Flowers rise after clouds finish
        const flowerEntrance = animate(flowers, {
          translateY: ["100%", "0%"],
          opacity: [0, 1],
          scale: [0.5, 1],
          duration: 1800,
          delay: stagger(150),
          ease: "out(3)",
        });

        animations.push(flowerEntrance);
      },
    });

    return () => {
      entrance.revert();
      animations.forEach((animation) => animation.revert());
    };
  }, []);

  return (
    <div
      ref={patternRef}
      className="pointer-events-none fixed bottom-0 left-0 z-20 hidden lg:block"
    >
      <div className="relative h-[474px] w-[474px]">
        {/* Clouds */}
        {patterns.map((item, index) => (
          <div
            key={index}
            className="pattern-item absolute z-10 h-[264px] w-[264px] opacity-0"
            style={{
              left: `${item.x}px`,
              bottom: `${item.y}px`,
            }}
          >
            <Image
              src="/layer/pattern.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        ))}

        {/* Left Flower */}
        <div className="flower-item absolute bottom-0 left-0 z-0 h-[400px] w-[400px] opacity-0">
          <Image
            src="/layer/flower.png"
            alt=""
            fill
            className="object-contain object-left-bottom"
          />
        </div>

        {/* Right Flowers */}
        <div className="flower-item absolute bottom-15 right-0 z-0 h-[200px] w-[200px] opacity-0">
          <Image
            src="/layer/rflower.png"
            alt=""
            fill
            className="object-contain object-right-bottom"
          />
        </div>

        <div className="flower-item absolute bottom-15 right-15 z-0 h-[200px] w-[200px] opacity-0">
          <Image
            src="/layer/rflower.png"
            alt=""
            fill
            className="object-contain object-right-bottom"
          />
        </div>
      </div>
    </div>
  );
}