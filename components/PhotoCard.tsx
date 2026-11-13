"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Card } from "@heroui/react";
import { Heart } from "lucide-react";

interface PhotoCardProps {
  image: string;
  alt: string;
  description: string;
  initialLikes?: number;
  className?: string;
}

export default function PhotoCard({
  image,
  alt,
  description,
  initialLikes = 128,
  className,
}: PhotoCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className={`w-full max-w-xs gap-3 p-3 ${className ?? ""}`}>
      <div
        data-drag-handle
        className="relative aspect-square w-full cursor-grab overflow-hidden rounded-xl active:cursor-grabbing"
      >
        <Image
          src={image}
          alt={alt}
          fill
          draggable={false}
          className="select-none object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>

      <Card.Content className="flex flex-row items-center justify-between gap-2 font-fredoka">
        <Button
          size="sm"
          variant="ghost"
          className="shrink-0 px-2 font-bold"
          onPress={() => setLiked((prev) => !prev)}
          aria-label={liked ? "Unlike photo" : "Like photo"}
        >
          <Heart
            size={22}
            className={liked ? "fill-rose-500 text-rose-500" : ""}
          />
          <span>{initialLikes + (liked ? 1 : 0)}</span>
        </Button>

        <p className="min-w-0 flex-1 truncate text-base font-medium leading-relaxed">
          {description}
        </p>
      </Card.Content>
    </Card>
  );
}