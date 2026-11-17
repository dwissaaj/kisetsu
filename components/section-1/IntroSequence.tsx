"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, splitText, stagger } from "animejs";

import WaveLoading from "./loader/WaveLoading";
import FlowerBackground from "./loader/FlowerBackground";

interface IntroSequenceProps {
  children: ReactNode;
}

export default function IntroSequence({ children }: IntroSequenceProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const [showLanding, setShowLanding] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const intro = introRef.current;

    if (!intro) return;

    // Skip the intro for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowLanding(true);

      return;
    }

    const animation = animate(intro, {
      opacity: [1, 0],
      duration: 8000,
      delay: 2000,
      ease: "inOut(3)",
      onComplete: () => {
        setShowLanding(true);
      },
    });

    return () => {
      animation.revert();
    };
  }, []);

  useEffect(() => {
    const target = textRef.current;

    if (!target) return;

    const split = splitText(target, {
      chars: true,
    });

    split.addEffect(({ chars }) =>
      animate(chars, {
        opacity: [0, 1],
        translateY: ["12px", "0px"],
        rotateX: ["-45deg", "0deg"],
        delay: stagger(35),
        duration: 800,
        ease: "out(3)",
      }),
    );

    return () => {
      split.revert();
    };
  }, []);

  return (
    <>
      {/* Landing page stays mounted underneath */}
      {children}

      {/* Intro overlay */}
      {!showLanding && (
        <div
          ref={introRef}
          className="gap-4 fixed inset-0 z-100 flex min-h-screen items-center justify-center bg-kisetsu text-[#4b493e]"
        >
          <FlowerBackground />

          {/* MP4 texture overlay */}
          <video
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-20"
            src="/background/bgsequence.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo */}
            <div className="text-center">
              <p className="font-japan text-4xl tracking-[0.35em]">季節</p>

              <p className="font-fredoka mt-3 mb-3 text-5xl tracking-[0.5em] uppercase">
                Kisetsu
              </p>
            </div>

            {/* Loading indicator */}
            <div className="m-3">
              <WaveLoading />
            </div>

            {/* Loading text */}
            <p
              ref={textRef}
              className="font-fredoka text-md tracking-[0.35em] text-[#969080] uppercase"
            >
              Preparing your seasons
            </p>
          </div>
        </div>
      )}
    </>
  );
}
