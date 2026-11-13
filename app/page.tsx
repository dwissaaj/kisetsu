import ParallaxGallery from "@/components/ParalaxWrapper";

export default function Home() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 overflow-x-clip py-8">
<div className="mx-auto w-full max-w-6xl px-4">
  <ParallaxGallery />
</div>
    </section>
  );
}
