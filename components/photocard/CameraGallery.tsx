"use client";

import { useEffect, useRef } from "react";
import { animate, createDraggable } from "animejs";

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

    const shells = Array.from(
      gallery.querySelectorAll<HTMLElement>("[data-card-shell]"),
    );

    const cards = gallery.querySelectorAll<HTMLElement>(
      "[data-draggable-card]",
    );

    const handles = gallery.querySelectorAll<HTMLElement>("[data-drag-handle]");

    const firstCard = shells[0];

    if (!firstCard) return;

    // Common starting position: bottom-right.
    const stackX = gallery.clientWidth - firstCard.offsetWidth - 8;
const stackY = gallery.clientHeight - firstCard.offsetHeight - 55;

    // Stack every card behind the first card.
    shells.forEach((shell, index) => {
      shell.style.left = `${stackX}px`;
      shell.style.top = `${stackY}px`;
      shell.style.rotate = "0deg";
      shell.style.opacity = "0";
      shell.style.zIndex = `${shells.length - index}`;
    });

    // Wait for the rest of the landing sequence.
    // Then spread all cards simultaneously.
    // Stage 1: Keep the deck hidden initially.
    const animations = shells.map((shell, index) => {
      const position = positions[index];

      const finalX = (parseFloat(position.left) / 100) * gallery.clientWidth;

      const finalY = parseFloat(position.top);

      // Stage 2: Reveal only the top card.
      if (index === 0) {
        return animate(shell, {
          opacity: [0, 1],
          delay: 10000,
          duration: 500,
          ease: "out(3)",
        });
      }

      // Stage 3: Fan out all remaining cards together.
      return animate(shell, {
        left: [`${stackX}px`, `${finalX}px`],
        top: [`${stackY}px`, `${finalY}px`],
        rotate: ["0deg", `${position.rotate}deg`],
        opacity: [0, 1],
        delay: 10800,
        duration: 1400,
        ease: "out(4)",
      });
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
      animations.forEach((animation) => animation.revert());
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
              zIndex: GalleryUrl.length - index,
              rotate: "0deg",
            }}
          >
            <div data-draggable-card className="w-full">
              <PhotoCard
                alt={`Cosplay moment ${index + 1}`}
                description={descriptions[index]}
                image={image}
                initialLikes={128 + index * 12}
              />
            </div>
          </div>
        );
      })}

      <div className="pointer-events-none absolute bottom-2 right-2 z-50 rounded-full bg-kisetsu-muted px-3 py-2 text-xs text-kisetsu-secondary backdrop-blur dark:bg-kisetsu-secondary dark:text-kisetsu-muted">
        ↔ Drag photos to explore
      </div>
    </div>
  );
}
