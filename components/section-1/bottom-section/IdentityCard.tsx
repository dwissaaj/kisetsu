"use client";

export default function IdentityCard() {
  return (
    <div className="relative z-30 w-full max-w-[420px] overflow-hidden border border-white/50 shadow-sm">
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/background/BgBlack.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0" />

      <div className="relative z-10 px-5 py-6 font-fredoka font-extrabold text-white md:px-7">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
          DWIS AJI
        </h1>

        <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
          VIDEO EDITOR
        </h1>

        <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
          SOFTWARE DEV
        </h1>

        <p className="mt-4 text-xs font-medium tracking-wide text-white/80">
          Indonesia Based
        </p>
      </div>
    </div>
  );
}
