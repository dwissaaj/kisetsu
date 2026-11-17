"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate } from "animejs";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) return;

    const animation = animate(content, {
      translateY: ["-100vh", "0vh"],
      duration: 2200,
      ease: "out(3)",
    });

    return () => {
      animation.pause();
    };
  }, [error]);

  return (
    <main className="text-color-old-japan-blue relative flex min-h-screen w-full items-center justify-center overflow-hidden text-color-old-japan-green font-japan">
      <Image
        fill
        priority
        alt=""
        className="pointer-events-none object-cover"
        src="/error/notFound.png"
      />

      <div
        ref={contentRef}
        className="relative  z-10 flex flex-col items-center px-6 text-center"
      >
        <h1 className="text-5xl font-extrabold tracking-tight  md:text-7xl">
          SORRY!
        </h1>

        <h2 className="mt-2 text-2xl  font-extrabold tracking-tight  md:text-4xl">
          SOMETHING WENT WRONG
        </h2>

        <p className="mt-3 text-2xl font-bold  md:text-3xl">御免なさい</p>

        <button
          className="mt-8 rounded-full border-2 border-kisetsu-secondary px-6 py-3 text-sm font-bold tracking-widest text-kisetsu-secondary transition-colors hover:border-[#FA699E] hover:bg-[#FA699E] hover:text-white"
          onClick={() => reset()}
        >
          TRY AGAIN
        </button>
      </div>
    </main>
  );
}
