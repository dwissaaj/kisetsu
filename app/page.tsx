import Image from "next/image";

import IntroSequence from "@/components/section-1/IntroSequence";
import MattingPad from "@/components/section-1/Mattingpad";
import IntroSection from "@/components/section-1/IntroSection";
import LandingScene from "@/components/section-1/loader/LandingScene";
import ScrollIndicator from "@/components/ScrollIndicator";
import BookDecoration from "@/components/section-1/layer/BookFanDecoration";
import PatternDecor from "@/components/section-1/layer/PatternDecor";

export default function Home() {
  return (
    <main className="h-screen w-full ">

        <ScrollIndicator />
        <LandingScene>
          <MattingPad>
            <Image
              priority
              alt="Matting pad"
              className="h-auto w-full"
              height={800}
              src="/background/8.png"
              width={1200}
            />
          </MattingPad>


          <BookDecoration />
          <IntroSection />
        </LandingScene>

    </main>
  );
}
