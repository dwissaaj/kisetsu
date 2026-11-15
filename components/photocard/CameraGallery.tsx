"use client";

import { useEffect, useRef } from "react";
import { animate, createDraggable, stagger } from "animejs";

import PhotoCard from "./PhotoCard";

export const GalleryUrl = [
  "/cosplay/4.png",
  "/cosplay/6.png",
  "/cosplay/5.png",
  "/cosplay/7.png",
  "/cosplay/8.png",
  "/cosplay/9.png",
];

const positions = [
  { left: "2%", top: "65px", rotate: -13 },
  { left: "18%", top: "20px", rotate: -9 },
  { left: "35%", top: "75px", rotate: -4 },
  { left: "52%", top: "30px", rotate: 2 },
  { left: "69%", top: "80px", rotate: 8 },
  { left: "85%", top: "35px", rotate: 12 },
];

const descriptions = [
  "A moment worth remembering.",
  "Captured in the right light.",
  "Little details, lasting memories.",
  "A story in every frame.",
  "Beautifully imperfect moments.",
  "Memories that stay forever.",
];

export default function CameraGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    const shells = gallery.querySelectorAll<HTMLElement>("[data-card-shell]");

    const cards = gallery.querySelectorAll<HTMLElement>(
      "[data-draggable-card]",
    );

    const handles = gallery.querySelectorAll<HTMLElement>("[data-drag-handle]");

    const entrance = animate(shells, {
      opacity: [0, 1],
      translateY: [25, 0],
      delay: stagger(100),
      duration: 900,
      ease: "out(2)",
    });

    const draggables = Array.from(cards).map((card, index) =>
      createDraggable(card, {
        container: gallery,
        trigger: handles[index],
        releaseStiffness: 180,
        releaseDamping: 24,
        cursor: true,
      }),
    );

    return () => {
      entrance.revert();
      draggables.forEach((draggable) => draggable.revert());
    };
  }, []);

  return (
    <div
      ref={galleryRef}
      className="relative h-[380px] w-full overflow-hidden"
      style={{
        touchAction: "pan-y",
      }}
    >
      {GalleryUrl.map((image, index) => {
        const position = positions[index];

        return (
          <div
            key={image}
            data-card-shell
            className="absolute w-[22%] min-w-40 max-w-64"
            style={{
              left: position.left,
              top: position.top,
              opacity: 0,
              zIndex: index + 1,
              transform: `rotate(${position.rotate}deg)`,
            }}
          >
            <div data-draggable-card className="w-full">
              <PhotoCard
                alt={`Wedding moment ${index + 1}`}
                description={descriptions[index]}
                image={image}
                initialLikes={128 + index * 12}
              />
            </div>
          </div>
        );
      })}

      <div className="pointer-events-none absolute bottom-2 right-2 z-50 rounded-full border border-default-200 bg-background/80 px-3 py-2 text-xs text-default-500 backdrop-blur">
        ↔ Drag photos to explore
      </div>
    </div>
  );
}
