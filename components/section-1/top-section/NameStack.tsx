"use client";

import React, { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";
import { Button, Tooltip } from "@heroui/react";

import { languages } from "@/config/lang";

export default function NameStack() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLHeadingElement>(null);
  const devRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const nameElement = nameRef.current;
    const videoElement = videoRef.current;
    const devElement = devRef.current;

    if (!nameElement || !videoElement || !devElement) return;

    let nameOpacityAnimation: ReturnType<typeof animate> | undefined;
    let nameMovementAnimation: ReturnType<typeof animate> | undefined;

    let videoOpacityAnimation: ReturnType<typeof animate> | undefined;
    let videoAnimation: ReturnType<typeof animate> | undefined;

    let devOpacityAnimation: ReturnType<typeof animate> | undefined;
    let devAnimation: ReturnType<typeof animate> | undefined;

    // DWIS AJI
    const nameSplit = splitText(nameElement, {
      lines: { wrap: "clip" },
    });

    const nameTargets = nameSplit.lines.length
      ? [...nameSplit.lines]
      : [nameElement];

    const nameDelayTimer = setTimeout(() => {
      nameOpacityAnimation = animate(nameElement, {
        opacity: [0, 1],
        duration: 2000,
        ease: "out(3)",
      });

      nameMovementAnimation = animate(nameTargets, {
        y: [{ to: ["100%", "0%"] }],
        duration: 2000,
        ease: "out(3)",
      });
    }, 8000);

    // VIDEO EDITOR
    const videoSplit = splitText(videoElement, {
      words: { wrap: "clip" },
    });

    const videoTargets = videoSplit.words.length
      ? [...videoSplit.words]
      : [videoElement];

    const videoDelayTimer = setTimeout(() => {
      videoOpacityAnimation = animate(videoElement, {
        opacity: [0, 1],
        duration: 1000,
        ease: "out(3)",
      });

      videoAnimation = animate(videoTargets, {
        y: [{ to: ["100%", "0%"] }],
        duration: 1000,
        ease: "out(3)",
        delay: stagger(100),
      });
    }, 10000);

    // SOFTWARE DEV
    const devSplit = splitText(devElement, {
      words: { wrap: "clip" },
    });

    const devTargets = devSplit.words.length
      ? [...devSplit.words]
      : [devElement];

    const devDelayTimer = setTimeout(() => {
      devOpacityAnimation = animate(devElement, {
        opacity: [0, 1],
        duration: 1000,
        ease: "out(3)",
      });

      devAnimation = animate(devTargets, {
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
    <div className="flex flex-col">
      <h1
        ref={nameRef}
        className="text-kisetsu-dark dark:text-kisetsu-secondary z-100 text-6xl font-extrabold leading-[0.95] tracking-[-0.06em] opacity-0 md:text-7xl"
      >
        DWIS AJI
      </h1>

      <h2
        ref={videoRef}
        className="text-kisetsu-dark dark:text-kisetsu-secondary text-3xl font-extrabold leading-[0.95] tracking-[-0.06em] opacity-0 md:text-4xl"
      >
        VIDEO EDITOR
      </h2>

      <h2
        ref={devRef}
        className="text-kisetsu-dark dark:text-kisetsu-secondary text-3xl font-extrabold leading-[0.95] tracking-[-0.06em] opacity-0 md:text-4xl"
      >
        SOFTWARE DEV.
      </h2>

      <div className="text-kisetsu-dark dark:text-kisetsu-secondary mt-3 flex flex-wrap items-center gap-x-1.5 text-xs font-medium tracking-wide md:text-sm">
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

              <Tooltip.Content className="bg-accent">
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