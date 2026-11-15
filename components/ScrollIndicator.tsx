"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      const current =
        scrollable > 0 ? window.scrollY / scrollable : 0;

      setProgress(Math.min(Math.max(current, 0), 1));
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  const thumbHeight = 12 + progress * 38;

  return (
    <div className="pointer-events-none fixed right-0 top-0 z-[200] h-screen w-[9px]">
      <div
        className="absolute right-0 rounded-full bg-[#FFE8C4] shadow-sm transition-all duration-200"
        style={{
          top: `${progress * (100 - thumbHeight)}%`,
          height: `${thumbHeight}%`,
          width: "7px",
        }}
      />
    </div>
  );
}