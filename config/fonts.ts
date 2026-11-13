import { Zen_Maru_Gothic, Fredoka } from "next/font/google";

export const fontJapan = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-japan",
});

export const fontFredoka = Fredoka({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
});
