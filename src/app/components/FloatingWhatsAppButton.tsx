"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsAppButton() {
  return (
    <a
      href="https://wa.me/5519953288802"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="
        fixed
        bottom-4 right-4
        sm:bottom-5 sm:right-5
        lg:bottom-6 lg:right-6

        bg-green-500
        text-white

        p-3 sm:p-4

        rounded-full
        shadow-lg

        hover:bg-green-600
        active:scale-95

        transition-all
        duration-300

        z-50

        animate-bounce
      "
    >
      <FaWhatsapp className="w-7 h-7 sm:w-8 sm:h-8" />
    </a>
  );
}
