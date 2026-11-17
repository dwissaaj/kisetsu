"use client";

import Image from "next/image";
import { useEffect, useState , useRef} from "react";
import { Button, Sheet, Slider, Tooltip } from "@heroui/react";
import {
  Disc3,
  Heart,
  ListMusic,
  PauseIcon,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Songplaylist } from "@/config/playlist";
import PlaylistSheet from "./PlaylistSheet";
import { animate } from "animejs";
const AUTO_SLIDE_INTERVAL = 5000;

export default function NowListening() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(23);

  const currentSong = Songplaylist[currentIndex];

  const selectSong = (index: number) => {
    setCurrentIndex(index);
    setProgress(23);
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % Songplaylist.length);
    setProgress(23);
  };

  const previousSong = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + Songplaylist.length) % Songplaylist.length,
    );
    setProgress(23);
  };

  // 5-second carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Songplaylist.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);
const playlistRef = useRef<HTMLElement>(null);

useEffect(() => {
  const element = playlistRef.current;

  if (!element) return;

  // Respect reduced-motion preferences.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const animation = animate(element, {
    opacity: [0, 1],
    translateY: ["30px", "0px"],
    duration: 1000,
    delay: 10000,
    ease: "out(3)",
  });

  return () => {
    animation.revert();
  };
}, []);
  return (
   <section
  ref={playlistRef}
  className="relative isolate box-border w-full max-w-[480px] overflow-hidden rounded-xl border border-[#594936]/15 p-3 shadow-md"
>
      {/* Background MP4 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      >
        <source src="/album/bgplaylist.mp4" type="video/mp4" />
      </video>

      {/* Background overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10" />

      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Disc3 size={16} className="" />

          <h3 className="text-xs font-bold uppercase tracking-wider text-kisetsu-secondary">
            My Playlist
          </h3>
        </div>

        <PlaylistSheet currentIndex={currentIndex} onSelectSong={selectSong} />
      </div>

      {/* Current song */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Tooltip>
            <Tooltip.Trigger>
              <Image
                src={currentSong.image}
                alt={currentSong.song}
                width={56}
                height={56}
                className="size-11 shrink-0 rounded-lg object-cover sm:size-14"
              />
            </Tooltip.Trigger>

            <Tooltip.Content className="max-w-64 rounded-xl p-3">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#594936]">
                  Copyright Notice
                </p>

                <p className="text-[11px] leading-relaxed text-[#594936]/75">
                  Album artwork belongs to its respective artist and copyright
                  holders. Images are displayed for music identification and
                  informational purposes.
                </p>

                <p className="text-[11px] leading-relaxed text-[#594936]/75">
                  Fair Use (Section 107, U.S. Copyright Act) may apply depending
                  on the circumstances. This notice does not itself establish
                  permission or fair use.
                </p>

                <p className="text-[10px] font-medium text-[#FA699E]">
                  Artwork source: Artist's official Instagram.
                </p>
              </div>
            </Tooltip.Content>
          </Tooltip>
        </div>

        <div className="w-0 min-w-0 flex-1 overflow-hidden font-japan">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-kisetsu-secondary">
            Now Listening
          </p>

          <h3 className="truncate text-sm font-semibold text-kisetsu-secondary">
            {currentSong.song}
          </h3>

          <p className="truncate text-xs font-bold text-kisetsu-secondary">
            {currentSong.singer}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 text-kisetsu-muted">
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            aria-label="Previous song"
            onPress={previousSong}
            className="text-kisetsu-muted"
          >
            <SkipBack size={16} />
          </Button>

          <PauseIcon className="ml-1 hidden shrink-0 sm:block" size={16} />

          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            aria-label="Next song"
            onPress={nextSong}
            className="text-kisetsu-muted"
          >
            <SkipForward size={16} />
          </Button>

          <Heart size={16} className="ml-1 hidden shrink-0  sm:block" />
        </div>
      </div>

      {/* Static music-style progress slider */}
      <div className="mt-3 flex w-full items-center gap-2 text-kisetsu-secondary">
        <span className="shrink-0 text-[9px] tabular-nums /55">00:52</span>

        <Slider
          aria-label="Song progress"
          value={progress}
          minValue={0}
          maxValue={100}
          className="min-w-0 w-full flex-1"
        >
          <Slider.Track className="h-1 w-full rounded-full bg-kisetsu-dark/15">
            <Slider.Fill className="rounded-full bg-[#FA699E]" />
            <Slider.Thumb className="size-2.5 border-2 border-[#FFE8C4] bg-[#FA699E] shadow-sm" />
          </Slider.Track>
        </Slider>

        <span className="shrink-0 text-[9px] tabular-nums text-kisetsu-secondary">
          03:45
        </span>
      </div>
    </section>
  );
}
