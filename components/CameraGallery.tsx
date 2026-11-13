"use client";

import { useEffect, useRef } from "react";
import { animate, createDraggable, stagger } from "animejs";

import PhotoCard from "@/components/PhotoCard";

export const GalleryUrl = [
  "/cosplay/4.png",
  "/cosplay/6.png",
  "/cosplay/5.png",
  "/cosplay/7.png",
  "/cosplay/8.png",
  "/cosplay/9.png",
];

const positions = [
  { left: "2%", top: "70px", rotate: -12 },
  { left: "18%", top: "20px", rotate: 8 },
  { left: "35%", top: "85px", rotate: -5 },
  { left: "52%", top: "25px", rotate: 10 },
  { left: "69%", top: "75px", rotate: -8 },
  { left: "85%", top: "15px", rotate: 6 },
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
    const handles = gallery.querySelectorAll<HTMLElement>("[data-drag-handle]");

    const entrance = animate(shells, {
      opacity: [0, 1],
      translateY: [25, 0],
      delay: stagger(100),
      duration: 900,
      ease: "out(2)",
    });

    const draggables = Array.from(handles).map((handle) =>
      createDraggable(handle.parentElement!, {
        container: gallery,
        releaseStiffness: 180,
        releaseDamping: 24,
        cursor: true,
        trigger: handle,
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
        perspective: "1000px",
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
            <div className="relative">
              <div
                data-drag-handle
                className="absolute inset-x-0 top-0 z-20 h-[75%] cursor-grab active:cursor-grabbing"
                aria-label={`Drag photo ${index + 1}`}
              />

              <PhotoCard
                image={image}
                alt={`Wedding moment ${index + 1}`}
                description={descriptions[index]}
                initialLikes={128 + index * 12}
              />
            </div>
          </div>
        );
      })}

      <div className="pointer-events-none absolute bottom-2 right-2 z-50 rounded-full bg-background/80 px-3 py-2 text-xs text-default-500 backdrop-blur">
        ↔ Drag photos to explore
      </div>
    </div>
  );
}