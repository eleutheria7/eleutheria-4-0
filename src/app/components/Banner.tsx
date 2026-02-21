"use client";

import Image from "next/image";
import Countdown from "../components/Countdown";

export default function Banner() {
  return (
    <div className="bg-white mt-5">
      <div className="w-[99%] mx-auto flex gap-2">

        {/* LADO ESQUERDO */}
        <div className="basis-[30%] flex flex-col gap-2">

          {/* VIDEO */}
          <div className="rounded-2xl overflow-hidden h-[403px]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/2AKDi6koRGk"
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
        <div className="basis-[70%] relative rounded-2xl overflow-hidden h-[520px]">

          <Image
            src="/img_page/cabecalho.jpg"
            alt="Banner"
            fill
            className="object-cover"
            priority
          />

          {/* OVERLAY ESCURO */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* TEXTO SOBRE A IMAGEM */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              ELEUTHERIA 2026
            </h1>

            <h2 className="text-xl md:text-2xl mb-6 max-w-3xl">
              “Nós amamos porque ele nos amou primeiro”
              <br />
               1 João 4, 10
            </h2>

            <p className="text-lg md:text-xl font-semibold mb-8">
              Dias 31 de julho, 1 e 2 de agosto de 2026
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}