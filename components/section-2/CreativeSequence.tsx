"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import TransitionText from "./TextTransition";

interface CreativeSequenceProps {
  intro: ReactNode;
  gallery: ReactNode;
}

export default function CreativeSequence({
  intro,
  gallery,
}: CreativeSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Wooden intro
  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.28],
    [1, 1, 0],
  );

  // Dark video
  const darkOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.58, 0.72],
    [0, 1, 1, 0],
  );

  // Transition text
  const textOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.72, 0.8],
    [0, 1, 1, 0],
  );

  const textY = useTransform(
    scrollYProgress,
    [0.3, 0.4],
    [40, 0],
  );

  // Light video
  const lightOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.72, 0.85],
    [0, 1, 1],
  );

  // Creative Gallery
  const galleryOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.9],
    [0, 1],
  );

  const galleryY = useTransform(
    scrollYProgress,
    [0.8, 0.9],
    [40, 0],
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#f5f1e8]"
    >
      {/* Persistent light background after sticky sequence */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="/background/light.mp4"
        className="pointer-events-none fixed inset-0 z-0 h-dvh w-full object-cover"
      />

      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[#f5f1e8]">

        {/* Section 1: Wooden intro */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute inset-0 z-10"
        >
          {intro}
        </motion.div>

        {/* Dark video */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src="/background/dark.mp4"
          style={{ opacity: darkOpacity }}
          className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover"
        />

        {/* Light video */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src="/background/light.mp4"
          style={{ opacity: lightOpacity }}
          className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover"
        />

        {/* Transition text */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          className="pointer-events-none absolute inset-0 z-40"
        >
          <TransitionText />
        </motion.div>

        {/* Final Creative Gallery */}
        <motion.div
          style={{
            opacity: galleryOpacity,
            y: galleryY,
          }}
          className="pointer-events-none absolute inset-0 z-50"
        >
          {gallery}
        </motion.div>

      </div>
    </section>
  );
}