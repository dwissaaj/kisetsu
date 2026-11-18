"use client";

export default function CreativeGallery() {
  return (
    <section className="flex h-full w-full flex-col justify-center px-8 py-16 md:px-20">
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-4 font-japan text-sm tracking-[0.35em]">
          創造
        </p>

        <h2 className="mb-12 font-fredoka text-5xl tracking-wide md:text-7xl">
          Creative Gallery
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex min-h-64 items-end rounded-2xl bg-black/20 p-8 backdrop-blur-sm">
            <h3 className="text-2xl">Photography</h3>
          </div>

          <div className="flex min-h-64 items-end rounded-2xl bg-black/20 p-8 backdrop-blur-sm">
            <h3 className="text-2xl">Video Editing</h3>
          </div>

          <div className="flex min-h-64 items-end rounded-2xl bg-black/20 p-8 backdrop-blur-sm">
            <h3 className="text-2xl">Graphic Design</h3>
          </div>

          <div className="flex min-h-64 items-end rounded-2xl bg-black/20 p-8 backdrop-blur-sm">
            <h3 className="text-2xl">Other Projects</h3>
          </div>
        </div>
      </div>
    </section>
  );
}