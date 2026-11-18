"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createDraggable } from "animejs";

interface DragWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function DragWrapper({
  children,
  className = "",
}: DragWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const items = Array.from(
      wrapper.querySelectorAll<HTMLElement>("[data-drag-item]"),
    );

    const draggables = items.map((item) =>
      createDraggable(item, {
        trigger:
          item.querySelector<HTMLElement>("[data-drag-handle]") ?? item,
        releaseStiffness: 180,
        releaseDamping: 24,
        cursor: true,
      }),
    );

    return () => {
      draggables.forEach((draggable) => draggable.revert());
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      {children}
    </div>
  );
}