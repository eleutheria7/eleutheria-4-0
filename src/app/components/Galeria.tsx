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
    <section
      id="fotos"
      className="bg-white py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >

      {/* TÍTULO */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 text-center mb-14 sm:mb-20 lg:mb-24">
        <h1 className="text-3xl sm:text-4xl font-serif italic text-gray-900">
          Fotos
        </h1>
      </div>

      {/* Fade esquerda */}
      <div
        className="
          absolute left-0 top-0 h-full
          w-10 sm:w-20 lg:w-32
          bg-gradient-to-r
          from-[#f4efe9]
          to-transparent
          z-10
          pointer-events-none
        "
      />

      {/* Fade direita */}
      <div
        className="
          absolute right-0 top-0 h-full
          w-10 sm:w-20 lg:w-32
          bg-gradient-to-l
          from-[#f4efe9]
          to-transparent
          z-10
          pointer-events-none
        "
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={16}
          loop
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          grabCursor
          breakpoints={{
            640: {
              spaceBetween: 20,
            },
            1024: {
              spaceBetween: 30,
            },
          }}
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
                  className="
                    w-[180px] h-[250px]
                    sm:w-[240px] sm:h-[320px]
                    lg:w-[320px] lg:h-[420px]
                    object-cover
                    rounded-2xl
                    transition-transform
                    duration-500
                    hover:scale-105
                  "
                />
              ) : (
                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
                  <Image
                    src={block.top}
                    alt=""
                    width={220}
                    height={200}
                    className="
                      w-[140px] h-[120px]
                      sm:w-[180px] sm:h-[160px]
                      lg:w-[220px] lg:h-[200px]
                      object-cover
                      rounded-2xl
                      transition-transform
                      duration-500
                      hover:scale-105
                    "
                  />

                  <Image
                    src={block.bottom}
                    alt=""
                    width={220}
                    height={200}
                    className="
                      w-[140px] h-[120px]
                      sm:w-[180px] sm:h-[160px]
                      lg:w-[220px] lg:h-[200px]
                      object-cover
                      rounded-2xl
                      transition-transform
                      duration-500
                      hover:scale-105
                    "
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
  { type: "stack", top: "/fotos/Imagem1.jpg", bottom: "/fotos/Imagem2.jpg" },
  { type: "single", image: "/fotos/Imagem3.jpg" },
  { type: "single", image: "/fotos/Imagem4.jpg" },
  { type: "stack", top: "/fotos/Imagem5.jpg", bottom: "/fotos/Imagem6.jpg" },
  { type: "single", image: "/fotos/Imagem7.jpg" },
  { type: "stack", top: "/fotos/Imagem8.jpg", bottom: "/fotos/Imagem9.jpg" },
  { type: "single", image: "/fotos/Imagem10.jpg" },
  { type: "single", image: "/fotos/Imagem11.jpg" },
  { type: "stack", top: "/fotos/Imagem12.jpg", bottom: "/fotos/Imagem13.jpg" },
  { type: "single", image: "/fotos/Imagem14.jpg" },
  { type: "stack", top: "/fotos/Imagem15.jpg", bottom: "/fotos/Imagem16.jpg" },
  { type: "single", image: "/fotos/Imagem17.jpg" },
  { type: "single", image: "/fotos/Imagem18.jpg" },
  { type: "stack", top: "/fotos/Imagem19.jpg", bottom: "/fotos/Imagem20.jpg" },
  { type: "single", image: "/fotos/Imagem21.jpg" },
  { type: "stack", top: "/fotos/Imagem22.jpg", bottom: "/fotos/Imagem23.jpg" },
  { type: "single", image: "/fotos/Imagem24.jpg" },
  { type: "single", image: "/fotos/Imagem25.jpg" },
  { type: "stack", top: "/fotos/Imagem26.jpg", bottom: "/fotos/Imagem27.jpg" },
  { type: "single", image: "/fotos/Imagem28.jpg" },

  { type: "stack", top: "/fotos/Imagem29.jpeg", bottom: "/fotos/Imagem30.jpeg" },
  { type: "single", image: "/fotos/Imagem31.jpeg" },
  { type: "single", image: "/fotos/Imagem32.jpeg" },
  { type: "stack", top: "/fotos/Imagem33.jpeg", bottom: "/fotos/Imagem34.jpeg" },
  { type: "single", image: "/fotos/Imagem35.jpeg" },
  { type: "stack", top: "/fotos/Imagem36.jpeg", bottom: "/fotos/Imagem37.jpeg" },
  { type: "single", image: "/fotos/Imagem38.jpeg" },
  { type: "single", image: "/fotos/Imagem39.jpeg" },
  { type: "stack", top: "/fotos/Imagem40.jpeg", bottom: "/fotos/Imagem41.jpeg" },
  { type: "single", image: "/fotos/Imagem42.jpeg" },
  { type: "stack", top: "/fotos/Imagem43.jpeg", bottom: "/fotos/Imagem44.jpeg" },
  { type: "single", image: "/fotos/Imagem45.jpeg" },
  { type: "single", image: "/fotos/Imagem46.jpeg" },
  { type: "stack", top: "/fotos/Imagem47.jpeg", bottom: "/fotos/Imagem48.jpeg" },
];