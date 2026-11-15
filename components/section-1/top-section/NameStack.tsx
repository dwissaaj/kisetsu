"use client";

import { Button, Tooltip } from "@heroui/react";
import React from "react";

const languages = [
  {
    code: "IDN",
    description: "Indonesian — Native speaker",
  },
  {
    code: "EN",
    description: "English — Professional proficiency",
  },
  {
    code: "JP",
    description: "Japanese — Preparing for JLPT",
  },
];

export default function NameStack() {
  return (
    <div className="flex flex-col ">
      <h1 className="text-6xl font-extrabold leading-[0.95] tracking-[-0.06em] text-kisetsu-secondary md:text-7xl">
        DWIS AJI
      </h1>

      <h2 className="text-3xl font-extrabold leading-[0.95] tracking-[-0.06em] text-kisetsu-secondary/50 md:text-4xl">
        VIDEO EDITOR
      </h2>

      <h2 className="text-3xl font-extrabold leading-[0.95] tracking-[-0.06em] text-kisetsu-secondary/50 md:text-4xl">
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
                variant="ghost"
                size="sm"
                className="h-auto min-w-0 rounded-sm px-1 py-0 text-xs font-bold text-kisetsu-secondary hover:text-[#FA699E] md:text-sm"
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