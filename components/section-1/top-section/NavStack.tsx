"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { animate, splitText, stagger } from "animejs";
import { useTheme } from "next-themes";

import TechStatus from "../bottom-section/TechStack";

import { ThemeSwitch } from "@/components/theme-switch";
import { NavStackSite } from "@/config/site";

export default function NavStack() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();

  const animations = useRef<Map<string, { cancel: () => unknown }>>(new Map());

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const backgroundVideo =
    resolvedTheme === "dark"
      ? "/background/navdark.mp4"
      : "/background/navlight.mp4";

  return (
    <div className="relative z-30 flex w-max max-w-full shrink-0 items-center justify-self-end gap-2">
      {/* DESKTOP NAVIGATION */}
      <nav className="relative isolate hidden h-8 w-max shrink-0 flex-nowrap items-center gap-1 overflow-hidden whitespace-nowrap rounded-full  px-2 shadow-[0_8px_30px_rgba(89,73,54,0.12)] backdrop-blur-2xl md:flex">
        {mounted && (
          <video
            key={resolvedTheme}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            preload="metadata"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}

        <div className="pointer-events-none absolute inset-0 z-[1] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]" />

        {NavStackSite.map((link, index) => (
          <Link
            key={link.label}
            className="relative z-10 shrink-0 whitespace-nowrap overflow-hidden rounded-full px-2 py-1 text-xs font-semibold text-kisetsu-dark transition-opacity duration-300 hover:opacity-60 dark:text-kisetsu-secondary md:text-sm"
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
            <span
              className="nav-title inline-block whitespace-nowrap"
              data-label={link.label}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* MOBILE CONTACT BUTTON */}
      <div className="relative h-8 shrink-0 md:hidden">
        <button
          aria-expanded={isMenuOpen}
          aria-label="Toggle contact menu"
          className="relative isolate flex h-8 shrink-0 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full px-4 text-xs font-semibold shadow-[0_8px_30px_rgba(89,73,54,0.12)] backdrop-blur-2xl transition-opacity hover:opacity-70"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {mounted && (
            <video
              key={resolvedTheme}
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
              preload="metadata"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          )}

          <span className="relative z-10">Contact</span>

          <svg
            className={`relative z-10 h-3 w-3 transition-transform duration-300 ${
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
          className={`absolute left-full top-0 z-50 ml-3 w-48 origin-top-left overflow-hidden rounded-2xl  shadow-[0_8px_30px_rgba(89,73,54,0.15)] backdrop-blur-2xl transition-all duration-300 ${
            isMenuOpen
              ? "visible translate-x-0 scale-100 opacity-100"
              : "invisible -translate-x-2 scale-95 opacity-0"
          }`}
        >
          {mounted && (
            <video
              key={resolvedTheme}
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
              preload="metadata"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          )}

          <div className="relative z-10 flex flex-col p-2">
            {NavStackSite.map((link) => (
              <Link
                key={link.label}
                className="rounded-xl px-4 py-3 text-xs font-semibold text-kisetsu-dark transition-colors hover:bg-white/20 dark:text-kisetsu-secondary"
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

      {/* TECH STATUS */}
      <div className="flex h-4 shrink-0 items-center">
        <TechStatus />
      </div>

      {/* THEME SWITCHER */}
      <div className="flex h-4 shrink-0 items-center">
        <ThemeSwitch />
      </div>
    </div>
  );
}
