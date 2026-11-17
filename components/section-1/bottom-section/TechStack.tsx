"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "@/components/ui/carousel";

const technologies = [
  {
    id: 1,
    name: "Built with Next.js",
    href: "https://nextjs.org/",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Hosted w/ Cloudflare",
    href: "https://www.cloudflare.com/",
    color: "bg-orange-500",
  },
  {
    id: 3,
    name: "Powered by Appwrite",
    href: "https://appwrite.io/",
    color: "bg-pink-500",
  },
  {
    id: 4,
    name: "Animated with Anime.js",
    href: "https://animejs.com/",
    color: "bg-purple-500",
  },
  {
    id: 5,
    name: "Builder Friend ChatGPT",
    href: "https://chatgpt.com/",
    color: "bg-emerald-500",
  },
];

export default function TechStatus() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  const textRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  const active = technologies[activeIndex];

  // Track active carousel item
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Automatic carousel
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  // Anime.js transition
  useEffect(() => {
    if (!textRef.current || !dotRef.current) return;

    const textAnimation = animate(textRef.current, {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 450,
      ease: "out(3)",
    });

    const dotAnimation = animate(dotRef.current, {
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 400,
      ease: "out(3)",
    });

    return () => {
      textAnimation.revert();
      dotAnimation.revert();
    };
  }, [activeIndex]);

  return (
    <div className="relative flex items-center gap-2 overflow-hidden rounded-full border border-white/30  px-3 py-1.5">
      {/* Animated video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
      >
        <source src="/background/bgStatus.mp4" type="video/mp4" />
      </video>

      {/* Technology carousel */}
      <Carousel
        className="w-38"
        opts={{
          loop: true,
          align: "center",
        }}
        setApi={setApi}
      >
        <CarouselContent className="ml-0">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              ref={tech.name === active.name ? textRef : undefined}
            >
              <Link
                key={tech.id}
                className="flex w-full items-center justify-center whitespace-nowrap px-4 text-xs text-kisetsu-dark dark:text-kisetsu-secondary font-semi transition-opacity hover:opacity-70"
                href={tech.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {tech.name} ↗
              </Link>
            </div>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
