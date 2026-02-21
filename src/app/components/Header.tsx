"use client";

import Image from "next/image";
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
      {/* CONTAINER INTERNO */}
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
            className="object-contain transition-all duration-500"
            priority
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
          {/* MENU */}
          <nav>
            <ul className="flex gap-6 text-gray-800 font-medium text-lg">
              <li className="hover:text-black cursor-pointer transition">
                Sobre
              </li>
              <li className="hover:text-black cursor-pointer transition">
                Testemunhos
              </li>
              <li className="hover:text-black cursor-pointer transition">
                Fotos
              </li>
              <li className="hover:text-black cursor-pointer transition">
                Local
              </li>
            </ul>
          </nav>

          {/* BOTÕES */}
          <div className="flex items-center gap-4">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white transition px-6 py-2 rounded-full font-semibold shadow-md">
              Inscrição →
            </button>

            <button className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center font-bold hover:bg-gray-100 transition">
              ?
            </button>
          </div>
        </div>
      </div>

      {/* LINHA DELIMITADORA FINAL */}
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
