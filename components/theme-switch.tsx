"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export const ThemeSwitch = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";

  const handleToggle = () => {
    setTheme(isLight ? "dark" : "light");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div aria-hidden className="h-6 w-6" />;

  return (
    <Button
      isIconOnly
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className="h-auto w-auto cursor-pointer rounded-lg bg-transparent px-px text-muted transition-opacity hover:opacity-80"
      size="sm"
      variant="ghost"
      onPress={handleToggle}
    >
      {isLight ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
    </Button>
  );
};
