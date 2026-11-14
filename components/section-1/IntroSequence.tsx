"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate } from "animejs";
import WaveLoading from "./WaveLoading";

interface IntroSequenceProps {
  children: ReactNode;
}

export default function IntroSequence({ children }: IntroSequenceProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const [showLanding, setShowLanding] = useState(false);

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
      duration: 6000,
      delay: 2100,
      ease: "inOut(3)",
      onComplete: () => {
        setShowLanding(true);
      },
    });

    return () => {
      animation.revert();
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
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <div className="text-center">
              <p className="font-japan text-4xl tracking-[0.35em]">
                季節
              </p>

              <p className="font-fredoka mt-3 mb-3 text-4xl tracking-[0.5em] uppercase">
                Kisetsu
              </p>
            </div>

            {/* Loading indicator */}
            <div className="m-3">
              <WaveLoading />
            </div>

            {/* Loading text */}
            <p className="font-fredoka text-[9px] tracking-[0.35em] text-[#969080] uppercase">
              Preparing your seasons
            </p>
          </div>
        </div>
      )}
    </>
  );
}