"use client";

import { useEffect, useRef } from "react";
import CameraGallery from "./CameraGallery";

export default function ParallaxGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;

    if (!wrapper || !stage) return;

    const cards = stage.querySelectorAll<HTMLElement>("[data-card-shell]");

    // Give every card its own depth.
    cards.forEach((card, index) => {
      const depth = (index - (cards.length - 1) / 2) * 45;

      card.style.transform = `
        translateZ(${depth}px)
        ${card.style.transform}
      `;

      card.style.transformStyle = "preserve-3d";
    });

    let currentX = 0;
    let currentY = 0;

    let targetX = 0;
    let targetY = 0;

    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      // Don't tilt the gallery while dragging an individual card.
      if (event.buttons !== 0) return;

      const rect = wrapper.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      targetY = x * 12;
      targetX = -y * 8;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      stage.style.transform = `
        rotateX(${currentX}deg)
        rotateY(${currentY}deg)
      `;

      frame = requestAnimationFrame(render);
    };

    wrapper.addEventListener("pointermove", handlePointerMove);
    wrapper.addEventListener("pointerleave", handlePointerLeave);

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      wrapper.removeEventListener("pointermove", handlePointerMove);
      wrapper.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      <div
        ref={stageRef}
        className="relative w-full"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <CameraGallery />
      </div>
    </div>
  );
}