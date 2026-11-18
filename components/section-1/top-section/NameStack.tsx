"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";
import { Button, Tooltip } from "@heroui/react";
import React from "react";

import { languages } from "@/config/lang";

export default function NameStack() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLHeadingElement>(null);
  const devRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!nameRef.current || !videoRef.current || !devRef.current) return;

    let nameOpacityAnimation: ReturnType<typeof animate> | undefined;
    let nameMovementAnimation: ReturnType<typeof animate> | undefined;

    let videoOpacityAnimation: ReturnType<typeof animate> | undefined;
    let videoAnimation: ReturnType<typeof animate> | undefined;

    let devOpacityAnimation: ReturnType<typeof animate> | undefined;
    let devAnimation: ReturnType<typeof animate> | undefined;

    // Split DWIS AJI only once.
    const nameSplit = splitText(nameRef.current, {
      lines: { wrap: "clip" },
    });

    // Capture the original lines. No addEffect or resize-triggered animation.
    const nameLines = [...nameSplit.lines];

    // DWIS AJI — animate only once after 8 seconds.
    const nameDelayTimer = setTimeout(() => {
      nameOpacityAnimation = animate(nameRef.current!, {
        opacity: [0, 1],
        duration: 2000,
        ease: "out(3)",
      });

      nameMovementAnimation = animate(nameLines, {
        y: [{ to: ["100%", "0%"] }],
        duration: 2000,
        ease: "out(3)",
      });
    }, 8000);

    // VIDEO EDITOR
    const videoSplit = splitText(videoRef.current, {
      words: { wrap: "clip" },
    });

    const videoDelayTimer = setTimeout(() => {
      videoOpacityAnimation = animate(videoRef.current!, {
        opacity: [0, 1],
        duration: 1000,
        ease: "out(3)",
      });

      videoAnimation = animate(videoSplit.words, {
        y: [{ to: ["100%", "0%"] }],
        duration: 1000,
        ease: "out(3)",
        delay: stagger(100),
      });
    }, 10000);

    // SOFTWARE DEV
    const devSplit = splitText(devRef.current, {
      words: { wrap: "clip" },
    });

    const devDelayTimer = setTimeout(() => {
      devOpacityAnimation = animate(devRef.current!, {
        opacity: [0, 1],
        duration: 1000,
        ease: "out(3)",
      });

      devAnimation = animate(devSplit.words, {
        y: [{ to: ["100%", "0%"] }],
        duration: 1000,
        ease: "out(3)",
        delay: stagger(100),
      });
    }, 10000);

    return () => {
      clearTimeout(nameDelayTimer);
      clearTimeout(videoDelayTimer);
      clearTimeout(devDelayTimer);

      nameOpacityAnimation?.cancel();
      nameMovementAnimation?.cancel();

      videoOpacityAnimation?.cancel();
      videoAnimation?.cancel();

      devOpacityAnimation?.cancel();
      devAnimation?.cancel();

      nameSplit.revert();
      videoSplit.revert();
      devSplit.revert();
    };
  }, []);

  return (
    <div className="flex flex-col ">
      <h1
        ref={nameRef}
        className="text-kisetsu-dark dark:text-kisetsu-secondary z-100 text-6xl font-extrabold leading-[0.95] tracking-[-0.06em]  opacity-0 md:text-7xl"
      >
        DWIS AJI
      </h1>

      <h2
        ref={videoRef}
        className="text-kisetsu-dark dark:text-kisetsu-secondary text-3xl font-extrabold leading-[0.95] tracking-[-0.06em]  opacity-0 md:text-4xl"
      >
        VIDEO EDITOR
      </h2>

      <h2
        ref={devRef}
        className="text-kisetsu-dark dark:text-kisetsu-secondary  text-3xl font-extrabold leading-[0.95] tracking-[-0.06em]  opacity-0 md:text-4xl"
      >
        SOFTWARE DEV.
      </h2>

      <div className="text-kisetsu-dark dark:text-kisetsu-secondary mt-3 flex flex-wrap items-center gap-x-1.5 text-xs font-medium tracking-wide  md:text-sm">
        <span>Remote Worker</span>
        <span>·</span>
        <span>Indonesia</span>
        <span>·</span>

        {languages.map((language, index) => (
          <React.Fragment key={language.code}>
            <Tooltip delay={0}>
              <Button
                className="text-kisetsu-dark dark:text-kisetsu-secondary h-auto min-w-0 rounded-sm px-1 py-0 text-xs font-bold hover:text-[#FA699E] dark:hover:text-[#FA699E] md:text-sm"
                size="sm"
                variant="ghost"
              >
                {language.code}
              </Button>

              <Tooltip.Content className={"bg-accent"}>
                <p>{language.description}</p>
              </Tooltip.Content>
            </Tooltip>

            {index !== languages.length - 1 && <span>·</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
