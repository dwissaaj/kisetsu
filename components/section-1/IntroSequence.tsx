"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { animate, splitText, stagger } from "animejs";

import WaveLoading from "./loader/WaveLoading";
import FlowerBackground from "./loader/FlowerBackground";

interface IntroSequenceProps {
  children: ReactNode;
}

export default function IntroSequence({
  children,
}: IntroSequenceProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const [showLanding, setShowLanding] = useState(false);

  // Lock scrolling during the loading animation
  useLayoutEffect(() => {
    if (showLanding) return;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlHeight = html.style.height;
    const previousBodyHeight = body.style.height;

    const forceTop = () => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    const preventScroll = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      forceTop();
    };

    const preventKeyboardScroll = (event: KeyboardEvent) => {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];

      if (keys.includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.scrollTo(0, 0);

    html.style.setProperty("overflow", "hidden", "important");
    html.style.setProperty("height", "100%", "important");

    body.style.setProperty("overflow", "hidden", "important");
    body.style.setProperty("height", "100%", "important");

    window.addEventListener("scroll", forceTop, {
      passive: true,
    });

    window.addEventListener("wheel", preventScroll, {
      passive: false,
      capture: true,
    });

    window.addEventListener("touchmove", preventScroll, {
      passive: false,
      capture: true,
    });

    window.addEventListener("keydown", preventKeyboardScroll, {
      capture: true,
    });

    return () => {
      window.removeEventListener("scroll", forceTop);
      window.removeEventListener("wheel", preventScroll, true);
      window.removeEventListener("touchmove", preventScroll, true);
      window.removeEventListener("keydown", preventKeyboardScroll, true);

      html.style.overflow = previousHtmlOverflow;
      html.style.height = previousHtmlHeight;

      body.style.overflow = previousBodyOverflow;
      body.style.height = previousBodyHeight;

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    };
  }, [showLanding]);

  // Loading overlay animation
  useEffect(() => {
    const intro = introRef.current;

    if (!intro) return;

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

  // Loading text animation
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
      {children}

      {!showLanding && (
        <div
          ref={introRef}
          onWheel={(event) => event.preventDefault()}
          onTouchMove={(event) => event.preventDefault()}
          className="fixed inset-0 z-[9999] flex h-dvh w-full items-center justify-center gap-4 overflow-hidden bg-kisetsu text-[#4b493e]"
        >
          <FlowerBackground />

          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-20"
            preload="auto"
            src="/background/bgsequence.mp4"
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="font-japan text-4xl tracking-[0.35em]">
                季節
              </p>

              <p className="font-fredoka mt-3 mb-3 text-5xl tracking-[0.5em] uppercase">
                Kisetsu
              </p>
            </div>

            <div className="m-3">
              <WaveLoading />
            </div>

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