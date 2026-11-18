
"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";

export default function TransitionText() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const description = descriptionRef.current;

    if (!heading || !description) return;

    const headingSplit = splitText(heading, {
      chars: true,
    });

    const descriptionSplit = splitText(description, {
      chars: true,
    });

    const headingAnimation = animate(headingSplit.chars, {
      opacity: [0, 1],
      translateY: ["30px", "0px"],
      duration: 900,
      delay: stagger(35),
      ease: "out(3)",
    });

    const descriptionAnimation = animate(descriptionSplit.chars, {
      opacity: [0, 1],
      translateY: ["20px", "0px"],
      duration: 700,
      delay: stagger(20, { start: 900 }),
      ease: "out(3)",
    });

    return () => {
      headingAnimation.revert();
      descriptionAnimation.revert();
      headingSplit.revert();
      descriptionSplit.revert();
    };
  }, []);

  return (
    <section className="flex h-full w-full items-center justify-center px-6 text-center">
      <div className="max-w-4xl">
        <h2
          ref={headingRef}
          className="font-fredoka text-4xl leading-tight tracking-wide md:text-6xl lg:text-7xl"
        >
          A design, photograph
          <br />
          and editing
        </h2>

        <p
          ref={descriptionRef}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed tracking-wide text-current/75 md:text-xl"
        >
          A collection of moments, stories, and memories —
          thoughtfully captured, creatively crafted,
          and preserved through every frame.
        </p>
      </div>
    </section>
  );
}
