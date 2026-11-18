"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      const current =
        scrollable > 0 ? window.scrollY / scrollable : 0;

      setProgress(Math.min(Math.max(current, 0), 1));
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateScroll);

    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  // Actual pixel height: 10px at the top, 108px at the bottom
  const thumbHeight = 10 + progress * 98;

  // Keep thumb inside the viewport
  const thumbTop = progress * (viewportHeight - thumbHeight);

  return (
    <div className="pointer-events-none fixed right-0 top-0 z-[200] h-screen w-[9px]">
      <div
        className="absolute right-0 rounded-full bg-[#FFE8C4] shadow-sm transition-all duration-150"
        style={{
          top: `${thumbTop}px`,
          height: `${thumbHeight}px`,
          width: "7px",
        }}
      />
    </div>
  );
}