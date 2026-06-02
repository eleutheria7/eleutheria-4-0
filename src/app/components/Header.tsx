"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 bg-white
        transition-all duration-500 ease-in-out
        ${scrolled ? "shadow-md" : ""}
      `}
    >

      {/* CONTAINER */}
      <div
        className={`
          flex items-center justify-between
          px-4 sm:px-6 lg:px-10
          transition-all duration-500
          ${scrolled ? "py-3 lg:py-4" : "py-4 lg:py-6"}
        `}
      >

        {/* ESQUERDA */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">

          <Image
            src="/img_page/logo1.png"
            alt="Logo"
            width={60}
            height={60}
            priority
            className="
              object-contain
              w-[45px] h-[45px]
              sm:w-[55px] sm:h-[55px]
              lg:w-[60px] lg:h-[60px]
            "
          />

          <div className="leading-tight text-black">

            <h1
              className="
                text-lg sm:text-xl lg:text-2xl
                font-bold tracking-wide
              "
            >
              𝔼𝕝𝕖𝕦𝕥𝕙𝕖𝕣𝕚𝕒
            </h1>

            <span
              className="
                text-sm sm:text-base lg:text-lg
                font-semibold
                tracking-[3px] lg:tracking-[5px]
              "
            >
              𝟚𝟘𝟚𝟞
            </span>

          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center gap-8">

          {/* MENU */}
          <nav>
            <ul className="flex gap-6 text-gray-800 font-medium text-lg">
              <li>
                <a
                  href="#sobre"
                  className="hover:text-black transition"
                >
                  Sobre
                </a>
              </li>

              <li>
                <a
                  href="#depoimentos"
                  className="hover:text-black transition"
                >
                  Testemunhos
                </a>
              </li>

              <li>
                <a
                  href="#fotos"
                  className="hover:text-black transition"
                >
                  Fotos
                </a>
              </li>

              <li>
                <a
                  href="#local"
                  className="hover:text-black transition"
                >
                  Local
                </a>
              </li>

            </ul>
          </nav>

          {/* BOTÕES */}
          <div className="flex items-center gap-4">

            <Link
              href="/formulario"
              className="
                bg-emerald-500 hover:bg-emerald-600
                text-white
                px-6 py-2
                rounded-full
                font-semibold
                shadow-md
                transition-all hover:scale-105
              "
            >
              Inscrição
            </Link>

            <button
              className="
                text-emerald-500
                w-10 h-10
                rounded-full
                border border-emerald-400
                flex items-center justify-center
                font-bold
                transition hover:bg-emerald-50
              "
            >
              ?
            </button>

          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            lg:hidden
            text-black
            p-2
            rounded-lg
          "
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          lg:hidden overflow-hidden transition-all duration-300
          ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 pb-6 border-t border-gray-200">

          <nav className="pt-4">
            <ul className="flex flex-col gap-4 text-gray-800 font-medium">

              <li>
                <a
                  href="#sobre"
                  className="block hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Sobre
                </a>
              </li>

              <li>
                <a
                  href="#depoimentos"
                  className="block hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Testemunhos
                </a>
              </li>

              <li>
                <a
                  href="#fotos"
                  className="block hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Fotos
                </a>
              </li>

              <li>
                <a
                  href="#local"
                  className="block hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Local
                </a>
              </li>

            </ul>
          </nav>

          {/* BOTÕES MOBILE */}
          <div className="flex flex-col gap-3 mt-6">

            <Link
              href="/formulario"
              className="
                bg-emerald-500 hover:bg-emerald-600
                text-white
                px-6 py-3
                rounded-full
                font-semibold
                text-center
                shadow-md
                transition-all
              "
              onClick={() => setMenuOpen(false)}
            >
              Inscrição
            </Link>

            <button
              className="
                text-emerald-500
                h-12
                rounded-full
                border border-emerald-400
                flex items-center justify-center
                font-bold
                transition hover:bg-emerald-50
              "
            >
              ?
            </button>

          </div>

        </div>
      </div>

      {/* LINHA INFERIOR */}
      <div
        className={`
          transition-opacity duration-500
          ${scrolled ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="mx-4 sm:mx-6 lg:mx-10 h-px bg-gray-300"></div>
      </div>

    </header>
  );
}