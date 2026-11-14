import ParallaxGallery from "@/components/photocard/ParalaxWrapper";
import IntroSequence from "@/components/section-1/IntroSequence";
import LandingScene from "@/components/section-1/LandingScene";
import MattingPad from "@/components/section-1/Mattingpad";
import Image from "next/image";

export default function Home() {
  return (
    <IntroSequence>
      <LandingScene>
        <MattingPad>
         
<Image
          src="/background/8.png"
          alt="Matting pad"
          width={1200}
          height={800}
          priority
          className="h-auto w-full"
        />
        </MattingPad>

        {/* Your existing landing page content */}
      </LandingScene>
    </IntroSequence>
  );
}
