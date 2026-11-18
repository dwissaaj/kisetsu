
"use client";

import { useRef, useState } from "react";
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

  const handlePointerDown = (event: React.PointerEvent<HTMLParagraphElement>) => {
    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
    };
    dragged.current = false;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLParagraphElement>) => {
    if (!pointerStart.current) return;

    const distance = Math.hypot(
      event.clientX - pointerStart.current.x,
      event.clientY - pointerStart.current.y,
    );

    if (distance > 6) dragged.current = true;
  };

  const handlePointerUp = () => {
    pointerStart.current = null;
  };

  const handleClick = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }

    setExpanded((prev) => !prev);
  };

  return (
    <Card
      className={`relative w-full max-w-sm gap-3 border border-kisetsu-border bg-kisetsu-secondary p-3 text-kisetsu-dark transition duration-150 dark:border-kisetsu-muted dark:bg-kisetsu-dark dark:text-kisetsu-secondary ${
        expanded ? "z-[100] scale-110" : "scale-100"
      } ${className ?? ""}`}
    >
      {/* IMAGE */}
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
      <Card.Content className="flex flex-row items-start justify-between gap-2 font-fredoka">
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
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={handleClick}
          className={`min-w-0 flex-1 cursor-pointer text-base font-medium leading-relaxed transition duration-150 ${
            expanded ? "whitespace-normal break-words" : "truncate"
          }`}
        >
          {description}
        </p>
      </Card.Content>
    </Card>
  );
}
