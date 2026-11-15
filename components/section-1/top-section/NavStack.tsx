"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { animate, splitText, stagger } from "animejs";

import { NavStackSite } from "@/config/site";

export default function NavStack() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const animations = useRef<Map<string, { cancel: () => unknown }>>(new Map());

  const handleMouseEnter = (element: HTMLAnchorElement, key: string) => {
    const span = element.querySelector(".nav-title") as HTMLSpanElement;

    if (!span) return;

    animations.current.get(key)?.cancel();
    span.textContent = span.dataset.label ?? "";

    const { chars } = splitText(span, {
      chars: { wrap: "clip" },
    });

    const animation = animate(chars, {
      y: [{ to: ["100%", "0%"] }, { to: "-100%", delay: 750, ease: "in(3)" }],
      duration: 750,
      ease: "out(3)",
      delay: stagger(50),
      onComplete: () => {
        span.textContent = span.dataset.label ?? "";
        animations.current.delete(key);
      },
    });

    animations.current.set(key, animation);
  };

  const handleMouseLeave = (element: HTMLAnchorElement, key: string) => {
    animations.current.get(key)?.cancel();
    animations.current.delete(key);

    const span = element.querySelector(".nav-title") as HTMLSpanElement;

    if (span) {
      span.textContent = span.dataset.label ?? "";
    }
  };

  return (
    <div className="relative z-30 w-fit max-w-full justify-self-end">
      {/* DESKTOP NAVIGATION */}
      <nav
        className="relative hidden items-center gap-2 overflow-hidden rounded-full border border-white/50 px-4 py-1 shadow-[0_8px_30px_rgba(89,73,54,0.12)] backdrop-blur-2xl md:flex"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255,255,255,0.48), rgba(255,255,255,0.12)),
            url('/background/BgRing.png')
          `,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-full border border-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]" />

        {NavStackSite.map((link, index) => (
          <Link
            key={link.label}
            className="relative z-10 overflow-hidden rounded-full px-2 py-1 text-xs font-semibold text-white transition-opacity duration-300 hover:opacity-60 md:text-sm"
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
            onMouseEnter={(event) =>
              handleMouseEnter(event.currentTarget, String(index))
            }
            onMouseLeave={(event) =>
              handleMouseLeave(event.currentTarget, String(index))
            }
          >
            <span className="nav-title inline-block" data-label={link.label}>
              {link.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* MOBILE CONTACT BUTTON */}
      <div className="relative md:hidden">
        <button
          aria-expanded={isMenuOpen}
          aria-label="Toggle contact menu"
          className="flex items-center gap-2 rounded-full border border-white/50 px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_30px_rgba(89,73,54,0.12)] backdrop-blur-2xl transition-opacity hover:opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(255,255,255,0.48), rgba(255,255,255,0.12)),
              url('/background/BgRing.png')
            `,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Contact
          <svg
            className={`h-3 w-3 transition-transform duration-300 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="m6 9 6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>

        {/* MOBILE DROPDOWN */}
        <div
          className={`absolute left-full top-0 z-50 ml-3 w-48 origin-top-left overflow-hidden rounded-2xl border border-white/40 shadow-[0_8px_30px_rgba(89,73,54,0.15)] backdrop-blur-2xl transition-all duration-300 ${
            isMenuOpen
              ? "visible translate-x-0 scale-100 opacity-100"
              : "invisible -translate-x-2 scale-95 opacity-0"
          }`}
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.2)),
              url('/background/BgRing.png')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col p-2">
            {NavStackSite.map((link) => (
              <Link
                key={link.label}
                className="rounded-xl px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                <span className="ml-2 opacity-60">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
