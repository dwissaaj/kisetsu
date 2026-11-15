"use client";

import { ReactNode } from "react";

interface LandingSceneProps {
  children?: ReactNode;
  className?: string;
}

export default function LandingScene({
  children,
  className = "",
}: LandingSceneProps) {
  return (
    <section
      className={`relative isolate min-h-screen w-full overflow-hidden ${className}`}
    >
      {/* Wooden background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/background/6.png')",
        }}
      />

      {/* Moving shadow video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
        style={{
          opacity: 0.4,
          mixBlendMode: "multiply",
          filter: "contrast(1.15) saturate(1.2)",
        }}
      >
        <source
          src="/background/bg.mp4"
          type="video/mp4"
        />
      </video>

      {/* Warm lighting layer */}
      <div
        className="pointer-events-none absolute inset-0 z-[15]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,220,170,0.08), transparent 50%, rgba(60,90,40,0.08))",
        }}
      />

      {/* Main content */}
      <div className="relative z-20 min-h-screen w-full">
        {children}
      </div>
    </section>
  );
}