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

    // BOOK: TOP TO BOTTOM + FADE IN
    const bookAnimation = animate(book, {
      translateY: ["-120%", "0%"],
      opacity: [0, 1],
      duration: 2500,
      delay: 8000,
      ease: "out(3)",
    });

    // FAN: LEFT TO RIGHT + FADE IN
    const fanAnimation = animate(fan, {
      translateX: ["-100%", "0%"],
      opacity: [0, 1],
      duration: 2500,
      delay: 8000,
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
      <div className="pointer-events-none fixed left-1/2 top-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <div
          ref={bookHoverRef}
          className="pointer-events-auto cursor-pointer"
          style={{
            filter: `
              drop-shadow(4px 8px 5px rgba(0,0,0,0.28))
              drop-shadow(12px 18px 12px rgba(0,0,0,0.20))
              drop-shadow(20px 28px 20px rgba(0,0,0,0.12))
            `,
          }}
          onMouseEnter={handleBookEnter}
          onMouseLeave={handleBookLeave}
        >
          <div
            ref={bookEntranceRef}
            className="relative h-[320px] w-[250px] opacity-0 sm:h-[430px] sm:w-[340px] lg:h-[520px] lg:w-[410px]"
          >
            <Image
              fill
              alt=""
              sizes="(max-width: 768px) 0px, 50vw"
              className="object-contain "
              src="/layer/book.png"
            />
          </div>
        </div>
      </div>

      {/* FAN - LEFT CENTER */}
      <div className="pointer-events-none fixed left-[-12%] top-[45%] z-20 hidden -translate-y-1/2 md:block">
        <div
          ref={fanHoverRef}
          className="pointer-events-auto cursor-pointer"
          style={{
            filter: `
              drop-shadow(4px 8px 5px rgba(0,0,0,0.30))
              drop-shadow(12px 18px 12px rgba(0,0,0,0.20))
              drop-shadow(20px 28px 20px rgba(0,0,0,0.12))
            `,
          }}
          onMouseEnter={handleFanEnter}
          onMouseLeave={handleFanLeave}
        >
          {/* FAN ENTRANCE - LEFT TO RIGHT */}
          <div
            ref={fanEntranceRef}
            className="relative h-[280px] w-[280px] opacity-0 sm:h-[380px] sm:w-[380px] lg:h-[480px] lg:w-[480px]"
          >
            {/* FAN ROTATION - SEPARATE ELEMENT */}
            <div className="relative h-full w-full -rotate-90">
              <Image
                fill
                alt=""
                sizes="(max-width: 768px) 0px, 50vw"
                className="object-contain rotate-270"
                src="/layer/fan.png"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
