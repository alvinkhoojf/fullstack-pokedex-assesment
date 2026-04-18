import HeroCarousel from "./components/HeroCarousel";

export default function Home() {
  return (
    <main className="min-h-screen py-8">
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 grid-cols-[2.2fr_1fr] gap-4 h-[420px]">
          <HeroCarousel />

          <div className="grid grid-rows-2 gap-4 h-full">
            <div className="overflow-hidden h-full">
              <img
                src="/static-banner1.jpg"
                alt="Static banner 1"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="overflow-hidden h-full">
              <img
                src="/static-banner2.jpg"
                alt="Static banner 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}