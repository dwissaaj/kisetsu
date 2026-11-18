
"use client";

import { useEffect, useRef } from "react";
import { animate, createDraggable } from "animejs";

import PhotoCard from "./PhotoCard";
import { postGallery } from "@/config/post";


const positions = postGallery.map((_, index) => ({
  left: `${(index / (postGallery.length - 1)) * 83}%`,
  top: `${[65, 20, 75, 30, 80, 35, 65, 20, 75, 30, 80][index]}px`,
  rotate: -13 + (index / (postGallery.length - 1)) * 25,
}));

export default function CameraGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    const shells = Array.from(
      gallery.querySelectorAll<HTMLElement>("[data-card-shell]"),
    );

    const firstCard = shells[0];

    if (!firstCard) return;

    const stackX = gallery.clientWidth - firstCard.offsetWidth - 8;
    const stackY = gallery.clientHeight - firstCard.offsetHeight - 55;

    shells.forEach((shell, index) => {
      shell.style.left = `${stackX}px`;
      shell.style.top = `${stackY}px`;
      shell.style.rotate = "0deg";
      shell.style.opacity = "0";
      shell.style.zIndex = `${shells.length - index}`;
    });

    const animations = shells.map((shell, index) => {
      const position = positions[index];

      const finalX =
        (parseFloat(position.left) / 100) * gallery.clientWidth;

      const finalY = parseFloat(position.top);

      if (index === 0) {
        return animate(shell, {
          opacity: [0, 1],
          delay: 10000,
          duration: 500,
          ease: "out(3)",
        });
      }

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

    // Each card shell is draggable independently.
    const draggables = shells.map((shell) => {
      const handle =
        shell.querySelector<HTMLElement>("[data-drag-handle]");

      return createDraggable(shell, {
        trigger: handle ?? shell,
        releaseStiffness: 180,
        releaseDamping: 24,
        cursor: true,
      });
    });

    return () => {
      animations.forEach((animation) => animation.revert());
      draggables.forEach((draggable) => draggable.revert());
    };
  }, []);

  return (
    <div
      ref={galleryRef}
      className="relative min-h-[500px] w-full overflow-visible"
      style={{ touchAction: "pan-y" }}
    >
      {postGallery.map((post, index) => {
        const position = positions[index];

        return (
          <div
            key={post.id}
            data-card-shell
            className="absolute w-[22%] min-w-40 max-w-64"
            style={{
              left: position.left,
              top: position.top,
              zIndex: postGallery.length - index,
              rotate: "0deg",
              opacity: 0,
            }}
          >
            <PhotoCard
              alt={`Cosplay moment ${post.id}`}
              description={post.description}
              image={post.url}
              initialLikes={post.likes}
              aspectRatio={post.aspectRatio}
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute bottom-2 right-2 z-50 rounded-full bg-kisetsu-muted px-3 py-2 text-xs text-kisetsu-secondary backdrop-blur dark:bg-kisetsu-secondary dark:text-kisetsu-muted">
        ↔ Drag photos to explore
      </div>
    </div>
  );
}
