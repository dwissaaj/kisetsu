import ParallaxGallery from "@/components/photocard/ParalaxWrapper";
import LandingScene from "@/components/section-1/BackgroundWood";
import MattingPad from "@/components/section-1/Mattingpad";
import Image from "next/image";

export default function Home() {
  return (
    <LandingScene>
      <MattingPad className="max-w-5xl">
        <Image
          src="/background/8.png"
          alt="Matting pad"
          width={1200}
          height={800}
          priority
          className="h-auto w-full"
        />
      </MattingPad>
    </LandingScene>
  );
}
