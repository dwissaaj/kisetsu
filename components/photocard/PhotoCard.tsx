"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { Button, Card } from "@heroui/react";
import { Heart } from "lucide-react";

interface PhotoCardProps {
  image: string;
  alt: string;
  description: string;
  initialLikes?: number;
  className?: string;
  aspectRatio?: string;
}

export default function PhotoCard({
  image,
  alt,
  description,
  initialLikes = 128,
  className,
  aspectRatio = "1 / 1",
}: PhotoCardProps) {
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  const resizeStart = useRef<{
    x: number;
    width: number;
    shell: HTMLElement;
    maxWidth: number;
  } | null>(null);

  // Distinguish text clicks from drag gestures.
  const handleTextPointerDown = (
    event: PointerEvent<HTMLParagraphElement>,
  ) => {
    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
    };

    dragged.current = false;
  };

  const handleTextPointerMove = (
    event: PointerEvent<HTMLParagraphElement>,
  ) => {
    if (!pointerStart.current) return;

    const distance = Math.hypot(
      event.clientX - pointerStart.current.x,
      event.clientY - pointerStart.current.y,
    );

    if (distance > 6) dragged.current = true;
  };

  const handleTextPointerUp = () => {
    pointerStart.current = null;
  };

  const handleTextClick = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }

    setExpanded((prev) => !prev);
  };

  // Resize the outer draggable card shell.
  const handleResizeStart = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const shell = event.currentTarget.closest<HTMLElement>(
      "[data-card-shell]",
    );

    const gallery = shell?.parentElement;

    if (!shell || !gallery) return;

    const galleryRect = gallery.getBoundingClientRect();
    const shellRect = shell.getBoundingClientRect();

    const offsetX = shellRect.left - galleryRect.left;

    const maxWidth = Math.max(
      140,
      gallery.clientWidth - Math.max(0, offsetX) - 8,
    );

    resizeStart.current = {
      x: event.clientX,
      width: shell.offsetWidth,
      shell,
      maxWidth,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleResizeMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = resizeStart.current;

    if (!start) return;

    event.stopPropagation();

    const nextWidth = Math.min(
      start.maxWidth,
      Math.max(140, start.width + event.clientX - start.x),
    );

    start.shell.style.width = `${nextWidth}px`;
  };

  const handleResizeEnd = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    resizeStart.current = null;
  };

  return (
    <Card
      className={`relative w-full gap-1 border border-kisetsu-border bg-kisetsu-secondary p-2 text-kisetsu-dark transition duration-150 dark:border-kisetsu-muted dark:bg-kisetsu-dark dark:text-kisetsu-secondary ${
        expanded ? "z-100 scale-110" : "scale-100"
      } ${className ?? ""}`}
    >
      {/* IMAGE / DRAG HANDLE */}
      <div
        data-drag-handle
        className="relative w-full cursor-grab overflow-hidden rounded-xl active:cursor-grabbing"
        style={{ aspectRatio }}
      >
        <Image
          fill
          alt={alt}
          className="select-none object-cover transition-transform duration-500 hover:scale-105"
          draggable={false}
          sizes="(max-width: 768px) 100vw, 320px"
          src={image}
        />
      </div>

      {/* DESCRIPTION & LIKES */}
      <Card.Content className="flex flex-col items-start justify-between gap-0.5 font-fredoka">
        <Button
          aria-label={liked ? "Unlike photo" : "Like photo"}
          className="shrink-0 px-2 font-bold hover:bg-accent"
          size="sm"
          variant="ghost"
          onPress={() => setLiked((prev) => !prev)}
        >
          <Heart
            className={
              liked
                ? "fill-rose-500 text-rose-500"
                : "text-kisetsu-dark dark:text-kisetsu-secondary"
            }
            size={22}
          />

          <span className="text-kisetsu-dark dark:text-kisetsu-secondary">
            {initialLikes + (liked ? 1 : 0)}
          </span>
        </Button>

        <p
          onPointerDown={handleTextPointerDown}
          onPointerMove={handleTextPointerMove}
          onPointerUp={handleTextPointerUp}
          onPointerCancel={handleTextPointerUp}
          onClick={handleTextClick}
          className={`min-w-0 w-full cursor-pointer text-base font-medium leading-relaxed transition duration-150 ${
            expanded
              ? "whitespace-normal wrap-break-word"
              : "truncate"
          }`}
        >
          {description}
        </p>
      </Card.Content>

      {/* RESIZE HANDLE */}
      <div
        role="presentation"
        onPointerDown={handleResizeStart}
        onPointerMove={handleResizeMove}
        onPointerUp={handleResizeEnd}
        onPointerCancel={handleResizeEnd}
        className="absolute bottom-1 right-1 z-20 flex h-6 w-6 cursor-se-resize touch-none items-center justify-center rounded-br-lg text-kisetsu-muted transition duration-150 hover:text-kisetsu-dark dark:hover:text-kisetsu-secondary"
        style={{ touchAction: "none" }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M13 5V13H5" />
          <path d="M13 9L9 13" />
        </svg>
      </div>
    </Card>
  );
}