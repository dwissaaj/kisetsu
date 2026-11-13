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
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/background/6.png')",
        }}
      />

      {/* Lighting and shadow overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="landing-shadow absolute -inset-[20%]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen w-full">
        {children}
      </div>

      <style jsx>{`
        .landing-shadow {
          background: linear-gradient(
              115deg,
              transparent 20%,
              rgba(0, 0, 0, 0.12) 38%,
              transparent 55%,
              rgba(0, 0, 0, 0.1) 72%,
              transparent 85%
            );
          animation: shadowMove 18s ease-in-out infinite alternate;
          filter: blur(35px);
          opacity: 0.7;
        }

        @keyframes shadowMove {
          from {
            transform: translate(-5%, -2%) rotate(-5deg);
          }
          to {
            transform: translate(5%, 2%) rotate(5deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .landing-shadow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}