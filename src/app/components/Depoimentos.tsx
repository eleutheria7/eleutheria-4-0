"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Caveat } from "next/font/google";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

type Depoimento = {
  text: string;
  author: string;
  image: string;
};

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-white py-32">
      {/* TÍTULO */}
      <div className="text-center mb-20">
        <h2 className="text-4xl font-serif italic text-gray-900">
          Testemunhos
        </h2>
      </div>

      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay, Navigation]}
          centeredSlides
          loop
          slidesPerView="auto"
          spaceBetween={60}
          navigation
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} className="!w-[750px]">
              <Card {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function Card({ text, author, image }: Depoimento) {
  return (
    <div className="bg-gray-100 rounded-2xl p-13 h-[450px] flex flex-col justify-between shadow-sm border border-black">
      
      {/* PARTE SUPERIOR */}
      <div>
        <div className="text-4xl text-black leading-none">“</div>

        <p className="text-gray-700 leading-relaxed text-base mt-1">
          {text}
        </p>
      </div>

      {/* PARTE INFERIOR */}
      <div>
        <div className={`${caveat.className} text-3xl text-black mb-2 mt-4`}>
          {author}
        </div>

        <div className="h-px bg-gray-400 w-full"></div>

        <div className="flex justify-end mt-6">
          <Image
            src={image}
            alt={author}
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
        </div>
      </div>

    </div>
  );
}

const cards: Depoimento[] = [
  {
    text: "Meu nome é Giovana tenho 17 anos, participei do retiro Eleutheria ano passado, me reconectei profundamente com Jesus de uma forma que nunca imaginei. Foi ali que, com o coração aberto, me entreguei de uma vez por todas à Ele. Lembro com carinho de todos os momento sem que senti Sua presença de maneira tão forte, como tudo que estava ao meu redor sumisse e fosse apenas eu e ele. Eleutheria é muito mais que um retiro, é um tempo de cura e renovação. Cada oração, cada reflexão, cada momento de partilha, me aproximaram mais de Jesus e me ajudaram a entender o quanto Ele me ama.",
    author: "Giovana Schicovski",
    image: "/img_page/Giovana Schicovski.jpg",
  },
  {
    text: "Uma experiência que mudou minha vida espiritual.",
    author: "João P.",
    image: "/img_page/pessoa2.jpg",
  },
  {
    text: "Foi um retiro transformador. Deus falou comigo profundamente.",
    author: "Maria S.",
    image: "/img_page/pessoa3.jpg",
  },
  {
    text: "Encontrei paz e direção para minha caminhada.",
    author: "Carlos M.",
    image: "/img_page/pessoa4.jpg",
  },
];