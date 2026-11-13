"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate } from "animejs";

interface MattingPadProps {
  children: ReactNode;
  className?: string;
}

export default function MattingPad({
  children,
  className = "",
}: MattingPadProps) {
  const matRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mat = matRef.current;
    if (!mat) return;

    const entrance = animate(mat, {
      translateY: ["-120%", "0%"],
      opacity: [0, 1],
      duration: 1800,
      ease: "out(3)",
    });

    return () => {
      entrance.revert();
    };
  }, []);

  return (
    <div
      className={`pointer-events-none absolute -right-[12%] -top-[15%] z-10 w-[85%] max-w-6xl sm:-right-[10%] sm:-top-[20%] sm:w-[75%] ${className}`}
      style={{
        transform: "rotate(45deg) scale(1.4)",
        transformOrigin: "center",
      }}
    >
      <div
        ref={matRef}
        className="w-full opacity-0"
        style={{
          filter: `
            drop-shadow(3px 5px 3px rgba(0,0,0,0.22))
            drop-shadow(8px 12px 8px rgba(0,0,0,0.12))
          `,
        }}
      >
        {children}
      </div>
    </div>
  );
}