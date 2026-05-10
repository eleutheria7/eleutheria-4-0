"use client";

import Image from "next/image";
import Countdown from "../components/Countdown";

export default function Banner() {
  return (
    <div className="bg-white mt-5">
      <div className="w-[99%] mx-auto flex flex-col lg:flex-row gap-2">

        {/* LADO ESQUERDO */}
        <div className="w-full lg:basis-[30%] flex flex-col gap-2">

          {/* VIDEO */}
          <div className="rounded-2xl overflow-hidden h-[240px] sm:h-[320px] lg:h-[403px]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/7AU4KXimRbY"
              title="Tu és amor"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          </div>

          {/* COUNTDOWN */}
          <div className="rounded-2xl overflow-hidden">
            <Countdown />
          </div>

        </div>

        {/* BANNER */}
        <div className="w-full lg:basis-[70%] relative rounded-2xl overflow-hidden h-[350px] sm:h-[450px] lg:h-[520px]">

          <Image
            src="/img_page/Banner.jpeg"
            alt="Banner"
            fill
            className="object-cover"
            priority
          />

          {/* OVERLAY ESCURO */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* TEXTO SOBRE A IMAGEM */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 sm:px-6">

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              ELEUTHERIA 2026
            </h1>

            <h2 className="text-base sm:text-xl lg:text-2xl mb-6 max-w-3xl leading-relaxed">
              “Aproximai-vos de Deus, e ele se aproximará de vós.”
              <br />
              Tiago 4, 8
            </h2>

            <p className="text-sm sm:text-lg lg:text-xl font-semibold">
              Dias 31 de julho, 1 e 2 de agosto de 2026
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}