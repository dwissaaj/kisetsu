"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";

import { languages } from "@/config/lang";
import { Button, Tooltip } from "@heroui/react";
import React from "react";

export default function NameStack() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLHeadingElement>(null);
  const devRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!nameRef.current || !videoRef.current || !devRef.current) return;

    // DWIS AJI: unchanged
    let nameAnimation: ReturnType<typeof animate> | undefined;
    let nameDelayTimer: ReturnType<typeof setTimeout>;

    const nameSplit = splitText(nameRef.current, {
      lines: { wrap: "clip" },
    });

    nameSplit.addEffect(({ lines }) => {
      nameDelayTimer = setTimeout(() => {
        nameAnimation = animate(lines, {
          y: [{ to: ["100%", "0%"] }],
          duration: 750,
          ease: "out(3)",
          loop: false,
        });
      }, 5000);
    });

    // VIDEO EDITOR: enter once after 6000ms, then stay visible
    const videoSplit = splitText(videoRef.current, {
      words: { wrap: "clip" },
    });

    let videoAnimation: ReturnType<typeof animate> | undefined;

    const videoDelayTimer = setTimeout(() => {
      videoAnimation = animate(videoSplit.words, {
        y: [{ to: ["100%", "0%"] }],
        duration: 750,
        ease: "out(3)",
        delay: stagger(100),
        loop: false,
      });
    }, 6000);

    // SOFTWARE DEV: enter once after 6000ms, then stay visible
    const devSplit = splitText(devRef.current, {
      words: { wrap: "clip" },
    });

    let devAnimation: ReturnType<typeof animate> | undefined;

    const devDelayTimer = setTimeout(() => {
      devAnimation = animate(devSplit.words, {
        y: [{ to: ["100%", "0%"] }],
        duration: 750,
        ease: "out(3)",
        delay: stagger(100),
        loop: false,
      });
    }, 6000);

    return () => {
      clearTimeout(nameDelayTimer);
      clearTimeout(videoDelayTimer);
      clearTimeout(devDelayTimer);

      nameAnimation?.cancel();
      videoAnimation?.cancel();
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
        className="text-6xl font-extrabold leading-[0.95] tracking-[-0.06em] text-kisetsu-secondary md:text-7xl"
      >
        DWIS AJI
      </h1>

      <h2
        ref={videoRef}
        className="text-3xl font-extrabold leading-[0.95] tracking-[-0.06em] text-kisetsu-secondary/50 md:text-4xl"
      >
        VIDEO EDITOR
      </h2>

      <h2
        ref={devRef}
        className="text-3xl font-extrabold leading-[0.95] tracking-[-0.06em] text-kisetsu-secondary/50 md:text-4xl"
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