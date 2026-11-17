"use client";

import TechStatus from "./bottom-section/TechStack";
import NowListening from "./bottom-section/Playlist";
import NameStack from "./top-section/NameStack";
import NavStack from "./top-section/NavStack";
import ParallaxGallery from "../photocard/ParalaxWrapper";
import CameraGallery from "../photocard/CameraGallery";

export default function IntroSection() {
  return (
    <section className="box-border grid min-h-dvh w-full grid-cols-1 grid-rows-[auto_auto_1fr_auto_auto] gap-y-6 px-[4%] py-10 md:grid-cols-2 md:grid-rows-[auto_1fr_auto] md:gap-x-4 md:gap-y-0">
      <div className="row-start-1 min-w-0 justify-self-start md:col-start-1">
        <NameStack />
      </div>

<div className="row-start-2 min-w-0 justify-self-start md:col-start-2 md:row-start-1 md:justify-self-end">
  <NavStack />
</div>

      <div className="row-start-4 min-w-0 w-full self-end justify-self-start md:col-start-1 md:row-start-3 md:w-3/4">
        <NowListening />
      </div>

      <div className="row-start-5 min-w-0 w-full self-end justify-self-start md:col-start-2 md:row-start-3 md:w-full md:justify-self-end">
        <ParallaxGallery />
      </div>
    </section>
  );
}
