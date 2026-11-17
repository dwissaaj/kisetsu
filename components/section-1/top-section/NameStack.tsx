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

    // DWIS AJI: fade in and slide up after the 8-second intro sequence
    let nameOpacityAnimation: ReturnType<typeof animate> | undefined;
    let nameMovementAnimation: ReturnType<typeof animate> | undefined;
    let nameDelayTimer: ReturnType<typeof setTimeout>;

    const nameSplit = splitText(nameRef.current, {
      lines: { wrap: "clip" },
    });

    nameSplit.addEffect(({ lines }) => {
      nameDelayTimer = setTimeout(() => {
        nameOpacityAnimation = animate(nameRef.current!, {
          opacity: [0, 1],
          duration: 2000,
          ease: "out(3)",
          loop: false,
        });

        nameMovementAnimation = animate(lines, {
          y: [{ to: ["100%", "0%"] }],
          duration: 2000,
          ease: "out(3)",
          loop: false,
        });
      }, 8000);
    });

    // VIDEO EDITOR: fade in and slide up
    const videoSplit = splitText(videoRef.current, {
      words: { wrap: "clip" },
    });

    let videoOpacityAnimation: ReturnType<typeof animate> | undefined;
    let videoAnimation: ReturnType<typeof animate> | undefined;

    const videoDelayTimer = setTimeout(() => {
      videoOpacityAnimation = animate(videoRef.current!, {
        opacity: [0, 1],
        duration: 1000,
        ease: "out(3)",
        loop: false,
      });

      videoAnimation = animate(videoSplit.words, {
        y: [{ to: ["100%", "0%"] }],
        duration: 1000,
        ease: "out(3)",
        delay: stagger(100),
        loop: false,
      });
    }, 10000);

    // SOFTWARE DEV: fade in and slide up
    const devSplit = splitText(devRef.current, {
      words: { wrap: "clip" },
    });

    let devOpacityAnimation: ReturnType<typeof animate> | undefined;
    let devAnimation: ReturnType<typeof animate> | undefined;

    const devDelayTimer = setTimeout(() => {
      devOpacityAnimation = animate(devRef.current!, {
        opacity: [0, 1],
        duration: 1000,
        ease: "out(3)",
        loop: false,
      });

      devAnimation = animate(devSplit.words, {
        y: [{ to: ["100%", "0%"] }],
        duration: 1000,
        ease: "out(3)",
        delay: stagger(100),
        loop: false,
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
        className="z-100 text-6xl font-extrabold leading-[0.95] tracking-[-0.06em] text-kisetsu-secondary opacity-0 md:text-7xl"
      >
        DWIS AJI
      </h1>

      <h2
        ref={videoRef}
        className="text-3xl font-extrabold leading-[0.95] tracking-[-0.06em] text-kisetsu-secondary/50 opacity-0 md:text-4xl"
      >
        VIDEO EDITOR
      </h2>

      <h2
        ref={devRef}
        className="text-3xl font-extrabold leading-[0.95] tracking-[-0.06em] text-kisetsu-secondary/50 opacity-0 md:text-4xl"
      >
        SOFTWARE DEV.
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-x-1.5 text-xs font-medium tracking-wide text-kisetsu-secondary/70 md:text-sm">
        <span>Remote Worker</span>
        <span>·</span>
        <span>Indonesia</span>
        <span>·</span>

        {languages.map((language, index) => (
          <React.Fragment key={language.code}>
            <Tooltip delay={0}>
              <Button
                className="h-auto min-w-0 rounded-sm px-1 py-0 text-xs font-bold text-kisetsu-secondary hover:text-[#FA699E] md:text-sm"
                size="sm"
                variant="ghost"
              >
                {language.code}
              </Button>

              <Tooltip.Content>
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
