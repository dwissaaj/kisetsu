"use client";

import Image from "next/image";
import { Button, Sheet, Tooltip } from "@heroui/react";
import { Disc3, ListMusic } from "lucide-react";

import { Songplaylist } from "@/config/playlist";

interface PlaylistSheetProps {
  currentIndex: number;
  onSelectSong: (index: number) => void;
}

export default function PlaylistSheet({
  currentIndex,
  onSelectSong,
}: PlaylistSheetProps) {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button
          isIconOnly
          aria-label="Open playlist"
          className="shrink-0 text-kisetsu-secondary dark:text-kisetsu-dark hover:text-[#FA699E]"
          size="sm"
          variant="ghost"
        >
          <ListMusic className="text-accent" size={17} />
        </Button>
      </Sheet.Trigger>

      <Sheet.Backdrop >
        <Sheet.Content >
          <Sheet.Dialog className="bg-kisetsu-secondary dark:bg-kisetsu-muted">
            <Sheet.Handle />
            <Sheet.CloseTrigger />

            <Sheet.Header>
              <Sheet.Heading className="text-[#594936]">
                My Playlist
              </Sheet.Heading>
            </Sheet.Header>

            <Sheet.Body >
              <div className="flex flex-col gap-2 ">
                {Songplaylist.map((song, index) => {
                  const isActive = currentIndex === index;

                  return (
                    <Sheet.Close key={song.song}>
                      <Button
                        className={`flex h-auto w-full items-center justify-start gap-3 rounded-xl p-2 text-left ${
                          isActive ? "bg-[#FA699E]/15" : "hover:bg-[#594936]/5"
                        }`}
                        type="button"
                        variant="ghost"
                        onPress={() => onSelectSong(index)}
                      >
                        <Tooltip>
                          <Tooltip.Trigger>
                            <div className="size-11 shrink-0">
                              <Image
                                alt={song.song}
                                className="size-11 rounded-lg object-cover"
                                height={44}
                                src={song.image}
                                width={44}
                              />
                            </div>
                          </Tooltip.Trigger>

                          <Tooltip.Content className="max-w-64 rounded-xl p-3">
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-[#594936]">
                                Copyright Notice
                              </p>

                              <p className="text-[11px] leading-relaxed text-[#594936]/75">
                                Album artwork belongs to its respective artist
                                and copyright holders. Images are displayed for
                                music identification and informational purposes.
                              </p>

                              <p className="text-[11px] leading-relaxed text-[#594936]/75">
                                Fair Use (Section 107, U.S. Copyright Act) may
                                apply depending on the circumstances. This
                                notice does not itself establish permission or
                                fair use.
                              </p>

                              <p className="text-[10px] font-medium text-[#FA699E]">
                                Artwork source: Artist&apos;s official
                                Instagram.
                              </p>
                            </div>
                          </Tooltip.Content>
                        </Tooltip>

                        <div className="min-w-0 flex-1 text-left font-japan text-kisetsu-dark dark:text-kisetsu-secondary">
                          <p className="truncate text-sm font-semibold">
                            {song.song}
                          </p>

                          <p className="truncate text-xs">{song.singer}</p>
                        </div>

                        {isActive && (
                          <Disc3
                            className="shrink-0 text-[#FA699E]"
                            size={17}
                          />
                        )}
                      </Button>
                    </Sheet.Close>
                  );
                })}
              </div>
            </Sheet.Body>

            <Sheet.Footer>
              <Sheet.Close>
                <Button className="w-full bg-[#594936] text-[#FFE8C4]">
                  Done
                </Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
