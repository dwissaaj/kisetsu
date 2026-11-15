"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, stagger } from "animejs";

export default function NotFound() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    const content = contentRef.current;

    if (!left || !right || !content) return;

    const animations = [
      // Images rise together
      animate([left, right], {
        translateY: ["110vh", "0vh"],
        duration: 2400,
        ease: "out(3)",
      }),

      // Entire text content drops
      animate(content, {
        translateY: ["-100vh", "0vh"],
        duration: 1800,
        delay: 300,
        ease: "out(3)",
      }),
    ];

    return () => {
      animations.forEach((animation) => animation.pause());
    };
  }, []);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden ">
      {/* Background */}
      <Image
        src="/error/9.png"
        alt=""
        fill
        priority
        className="pointer-events-none object-cover"
      />

      {/* Left illustration */}
      <div
        ref={leftRef}
        className="pointer-events-none absolute bottom-0 left-[5%] z-10 h-[65vh] w-[35vw]"
      >
        <Image
          src="/error/8.png"
          alt=""
          fill
          priority
          className="object-contain object-bottom"
        />
      </div>

      {/* Right illustration */}
      <div
        ref={rightRef}
        className="pointer-events-none absolute bottom-0 right-[5%] z-10 h-[65vh] w-[35vw]"
      >
        <Image
          src="/error/7.png"
          alt=""
          fill
          priority
          className="object-contain object-bottom"
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center font-japan text-old-japan-blue px-6 text-center"
      >
        <h1 className="text-8xl  tracking-[-0.08em]  md:text-[12rem]">
          404
        </h1>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight  md:text-5xl">
          SOMETHING WENT WRONG
        </h2>

        <p className="mt-4 text-lg font-medium tracking-wider /70 md:text-2xl">
          なんか違う気がする
        </p>

        <Link
          href="/"
          className="mt-10 rounded-full border border-kisetsu-secondary/30 bg-[#FFE8C4]/70 px-8 py-3 text-sm font-bold tracking-wider  backdrop-blur-md transition-all duration-300 hover:bg-[#FA699E] hover:text-white"
        >
          BACK TO HOME
        </Link>
      </div>
    </main>
  );
}
