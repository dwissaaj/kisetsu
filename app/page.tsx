import ParallaxGallery from "@/components/photocard/ParalaxWrapper";
import IntroSequence from "@/components/section-1/IntroSequence";

import MattingPad from "@/components/section-1/Mattingpad";
import IntroSection from "@/components/section-1/IntroSection";
import Image from "next/image";
import LandingScene from "@/components/section-1/loader/LandingScene";
import ScrollIndicator from "@/components/ScrollIndicator";
import BookDecoration from "@/components/section-1/layer/BookDecoration";
import PatternDecor from "@/components/section-1/layer/PatternDecor";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden">
      <IntroSequence>
        <ScrollIndicator />
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

        <PatternDecor />
        <BookDecoration />
        <IntroSection />
      </LandingScene>
      </IntroSequence>
    </main>
  );
}