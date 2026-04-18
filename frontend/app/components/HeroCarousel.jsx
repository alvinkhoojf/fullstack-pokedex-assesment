"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000 })]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <div className="w-full h-full">
      <div
        className="overflow-hidden w-full h-full"
        ref={emblaRef}
      >
        <div className="flex h-full">
          <div className="flex-[0_0_100%] min-w-0 h-full">
            <img
              src="/banner1.jpg"
              alt="Banner 1"
              className="block w-full h-full object-cover"
            />
          </div>

          <div className="flex-[0_0_100%] min-w-0 h-full">
            <img
              src="/banner2.jpg"
              alt="Banner 2"
              className="block w-full h-full object-cover"
            />
          </div>

          <div className="flex-[0_0_100%] min-w-0 h-full">
            <img
              src="/banner3.png"
              alt="Banner 3"
              className="block w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}