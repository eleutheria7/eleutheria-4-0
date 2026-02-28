"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-500 ease-in-out ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* CONTAINER */}
      <div
        className={`flex items-center justify-between px-10 transition-all duration-500 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        {/* ESQUERDA */}
        <div className="flex items-center gap-6">
          <Image
            src="/img_page/logo1.png"
            alt="Logo"
            width={60}
            height={60}
            priority
            className="object-contain"
          />

          <div className="leading-tight text-black">
            <h1 className="text-2xl font-bold tracking-wide">
              𝔼𝕝𝕖𝕦𝕥𝕙𝕖𝕣𝕚𝕒
            </h1>
            <span className="text-lg font-semibold tracking-[5px]">
              𝟚𝟘𝟚𝟞
            </span>
          </div>
        </div>

        {/* DIREITA */}
        <div className="flex items-center gap-8">

          {/* MENU (SCROLL NA MESMA PÁGINA) */}
          <nav>
            <ul className="flex gap-6 text-gray-800 font-medium text-lg">

              <li>
                <a href="#sobre" className="hover:text-black transition">
                  Sobre
                </a>
              </li>

              <li>
                <a href="#depoimentos" className="hover:text-black transition">
                  Testemunhos
                </a>
              </li>

              <li>
                <a href="#fotos" className="hover:text-black transition">
                  Fotos
                </a>
              </li>

              <li>
                <a href="#local" className="hover:text-black transition">
                  Local
                </a>
              </li>

            </ul>
          </nav>

          {/* BOTÕES */}
          <div className="flex items-center gap-4">
            <Link
              href="/formulario"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all hover:scale-105"
            >
              Inscrição
            </Link>

            <button className="text-emerald-500 w-10 h-10 rounded-full border border-emerald-400 flex items-center justify-center font-bold transition hover:bg-emerald-50">
              ?
            </button>
          </div>
        </div>
      </div>

      {/* LINHA INFERIOR */}
      <div
        className={`transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-10 h-px bg-gray-300"></div>
      </div>
    </header>
  );
}