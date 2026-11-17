import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { Button } from "@heroui/react";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";

const handleToggle = () => {
  const nextTheme = isLight ? "dark" : "light";

  setTheme(nextTheme);
  console.log(nextTheme);
};

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div aria-hidden className="w-6 h-6" />;

  return (
    <Button
    isIconOnly
    variant="ghost"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      size="sm"
      onClick={handleToggle}

      // className={clsx(
      //   "px-px transition-opacity hover:opacity-80 cursor-pointer",
      //   "inline-flex items-center justify-center",
      //   "w-auto h-auto bg-transparent rounded-lg text-muted",
      //   className,
      // )}
    >
      {isLight ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
    </Button>
  );
};
