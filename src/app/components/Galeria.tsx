"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";


type Block =
  | { type: "single"; image: string }
  | { type: "stack"; top: string; bottom: string };

export default function Galeria() {
  return (
    <section className="bg-white py-24 relative overflow-hidden">

      {/* TÍTULO */}
      <div className="max-w-6xl mx-auto px-10 text-center mb-24">
        <h1 className="text-4xl font-serif italic text-gray-900">
          Fotos
        </h1>
      </div>

      {/* Fade esquerda */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#f4efe9] to-transparent z-10 pointer-events-none" />

      {/* Fade direita */}
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#f4efe9] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8">

        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={30}
          loop
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          grabCursor
        >
          {[...blocks, ...blocks].map((block, index) => (
            <SwiperSlide
              key={index}
              className="!w-auto flex-shrink-0"
            >
              {block.type === "single" ? (
                <Image
                  src={block.image}
                  alt=""
                  width={320}
                  height={420}
                  className="w-[320px] h-[420px] object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex flex-col gap-6">
                  <Image
                    src={block.top}
                    alt=""
                    width={220}
                    height={200}
                    className="w-[220px] h-[200px] object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                  />
                  <Image
                    src={block.bottom}
                    alt=""
                    width={220}
                    height={200}
                    className="w-[220px] h-[200px] object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

const blocks: Block[] = [
  { type: "stack", top: "/fotos/imagem1.jpg", bottom: "/fotos/imagem2.jpg" },
  { type: "single", image: "/fotos/imagem3.jpg" },
  { type: "single", image: "/fotos/imagem4.jpg" },
  { type: "stack", top: "/fotos/imagem5.jpg", bottom: "/fotos/imagem6.jpg" },
  { type: "single", image: "/fotos/imagem7.jpg" },
  { type: "stack", top: "/fotos/imagem8.jpg", bottom: "/fotos/imagem9.jpg" },
  { type: "single", image: "/fotos/imagem10.jpg" },
  { type: "single", image: "/fotos/imagem11.jpg" },
  { type: "stack", top: "/fotos/imagem12.jpg", bottom: "/fotos/imagem13.jpg" },
  { type: "single", image: "/fotos/imagem14.jpg" },
  { type: "stack", top: "/fotos/imagem15.jpg", bottom: "/fotos/imagem16.jpg" },
  { type: "single", image: "/fotos/imagem17.jpg" },
  { type: "single", image: "/fotos/imagem18.jpg" },
  { type: "stack", top: "/fotos/imagem19.jpg", bottom: "/fotos/imagem20.jpg" },
  { type: "single", image: "/fotos/imagem21.jpg" },
  { type: "stack", top: "/fotos/imagem22.jpg", bottom: "/fotos/imagem23.jpg" },
  { type: "single", image: "/fotos/imagem24.jpg" },
  { type: "single", image: "/fotos/imagem25.jpg" },
  { type: "stack", top: "/fotos/imagem26.jpg", bottom: "/fotos/imagem27.jpg" },
  { type: "single", image: "/fotos/imagem28.jpg" },
];