"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate } from "animejs";

export default function BookDecoration() {
  const bookHoverRef = useRef<HTMLDivElement>(null);
  const bookEntranceRef = useRef<HTMLDivElement>(null);

  const fanHoverRef = useRef<HTMLDivElement>(null);
  const fanEntranceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const book = bookEntranceRef.current;
    const fan = fanEntranceRef.current;

    if (!book || !fan) return;

    // BOOK: TOP TO BOTTOM
    const bookAnimation = animate(book, {
      translateY: ["-120%", "0%"],
      opacity: [0, 1],
      duration: 1800,
      delay: 5000,
      ease: "out(3)",
    });

    // FAN: RIGHT TO LEFT (HORIZONTAL)
    const fanAnimation = animate(fan, {
      translateX: ["150%", "0%"],
      opacity: [0, 1],
      duration: 1800,
      delay: 5000,
      ease: "out(3)",
    });

    return () => {
      bookAnimation.revert();
      fanAnimation.revert();
    };
  }, []);

  // BOOK HOVER ONLY
  const handleBookEnter = () => {
    if (!bookHoverRef.current) return;

    animate(bookHoverRef.current, {
      translateY: -5,
      duration: 300,
      ease: "out(2)",
    });
  };

  const handleBookLeave = () => {
    if (!bookHoverRef.current) return;

    animate(bookHoverRef.current, {
      translateY: 0,
      duration: 400,
      ease: "out(2)",
    });
  };

  // FAN HOVER - ROTATE ONLY
  const handleFanEnter = () => {
    if (!fanHoverRef.current) return;

    animate(fanHoverRef.current, {
      rotate: -8,
      duration: 400,
      ease: "out(2)",
    });
  };

  const handleFanLeave = () => {
    if (!fanHoverRef.current) return;

    animate(fanHoverRef.current, {
      rotate: 0,
      duration: 500,
      ease: "out(2)",
    });
  };

  return (
    <>
      {/* BOOK - TOP CENTER */}
      <div className="hidden lg:block pointer-events-none fixed left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
        <div
          ref={bookHoverRef}
          onMouseEnter={handleBookEnter}
          onMouseLeave={handleBookLeave}
          className="pointer-events-auto cursor-pointer"
          style={{
            filter: `
              drop-shadow(4px 8px 5px rgba(0,0,0,0.28))
              drop-shadow(12px 18px 12px rgba(0,0,0,0.20))
              drop-shadow(20px 28px 20px rgba(0,0,0,0.12))
            `,
          }}
        >
          <div
            ref={bookEntranceRef}
            className="relative h-[320px] w-[250px] opacity-0 sm:h-[430px] sm:w-[340px] lg:h-[520px] lg:w-[410px]"
          >
            <Image
              src="/layer/book.png"
              alt=""
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* FAN - RIGHT CENTER */}
      <div className="hidden lg:block pointer-events-none fixed right-[-12%] top-1/2 z-20 -translate-y-1/2">
        <div
          ref={fanHoverRef}
          onMouseEnter={handleFanEnter}
          onMouseLeave={handleFanLeave}
          className="pointer-events-auto cursor-pointer"
          style={{
            filter: `
              drop-shadow(4px 8px 5px rgba(0,0,0,0.30))
              drop-shadow(12px 18px 12px rgba(0,0,0,0.20))
              drop-shadow(20px 28px 20px rgba(0,0,0,0.12))
            `,
          }}
        >
          {/* FAN ENTRANCE - RIGHT TO LEFT */}
          <div
            ref={fanEntranceRef}
            className="relative h-[280px] w-[280px] opacity-0 sm:h-[380px] sm:w-[380px] lg:h-[480px] lg:w-[480px]"
          >
            {/* FAN ROTATION - SEPARATE ELEMENT */}
            <div className="relative h-full w-full -rotate-90">
              <Image
                src="/layer/fan.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}