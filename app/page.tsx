import Image from "next/image";

import IntroSequence from "@/components/section-1/IntroSequence";
import MattingPad from "@/components/section-1/Mattingpad";
import IntroSection from "@/components/section-1/IntroSection";
import LandingScene from "@/components/section-1/loader/LandingScene";
import BookDecoration from "@/components/section-1/layer/BookFanDecoration";

import CreativeSequence from "@/components/section-2/CreativeSequence";
import CreativeGallery from "@/components/section-2/CreativeGallery";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip">
      <IntroSequence>
        <CreativeSequence
          intro={
            <LandingScene>
              <MattingPad>
                <Image
                  priority
                  alt="Matting pad"
                  className="h-auto w-full -z-50"
                  height={800}
                  src="/background/8.png"
                  width={1200}
                />
              </MattingPad>

              <BookDecoration />
              <IntroSection />
            </LandingScene>
          }
          gallery={<CreativeGallery />}
        />
      </IntroSequence>

      <ScrollIndicator />
    </main>
  );
}