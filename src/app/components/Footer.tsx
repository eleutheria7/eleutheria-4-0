"use client";

import { useRouter } from "next/navigation";

import {
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";


export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-white text-gray-800 px-5 sm:px-8 lg:px-10 py-12 lg:py-16">
      
      <hr className="w-32 sm:w-48 mx-auto mb-12 lg:mb-20 border-t border-neutral-200" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* LEFT SIDE */}
        <div className="space-y-6 sm:col-span-2 lg:col-span-1">
          
          <h2 className="text-base sm:text-lg font-semibold tracking-widest">
            PARÓQUIA SANTA LUZIA
          </h2>

          <p className="text-sm max-w-xs">
            Grupo de jovens
          </p>

          <div className="space-y-3">

            {[
              "Inscrição",
              "Whatsapp da paróquia",
              "Dias de Missa",
              "Retiros Passados",
            ].map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === "Inscrição") router.push("/formulario");
                  if (btn === "Dias de Missa") window.open("https://scontent-gru1-2.cdninstagram.com/v/t51.82787-15/564181607_18092139850839356_2555514405071213468_n.webp?stp=dst-webp_p480x480&_nc_cat=103&ig_cache_key=Mjk0NTE0MTUxODExMDMwMDA4OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjcyMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=-0aCGYCKRWMQ7kNvwG-p94x&_nc_oc=AdoiWR28kM0tTEFtxjrz4zH6qka2Vs9PHJsLRSyT77GuebOG0KieYR_Z8GMCFhcUQ8A&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_gid=G4nD30cFfNHh99wCVurt2g&_nc_ss=7a22e&oh=00_Af9bOPv1jq11-dqdLvvQMw3ozqLnDIVr0ZdH7IF-8Dg8SQ&oe=6A240330", "_blank");
                  if (btn === "Retiros Passados") window.open("https://eleutheria-3-0.vercel.app", "_blank");
                  if (btn === "Whatsapp da paróquia") window.open("https://wa.me/551938192184", "_blank");
                }}
                className="
                  flex justify-between items-center
                  w-full
                  border-2 border-black
                  rounded-full
                  px-4 sm:px-5
                  py-2 sm:py-3
                  text-sm sm:text-base
                  hover:bg-black hover:text-white
                  transition
                "
              >
                {btn}
                <span>→</span>
              </button>
            ))}

          </div>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="font-semibold mb-4 border-b pb-2 text-sm sm:text-base">
            Dons do Espirito Santo
          </h3>

          <ul className="space-y-2 text-sm">
            <li>Sabedoria</li>
            <li>Inteligência</li>
            <li>Conselho</li>
            <li>Fortaleza</li>
            <li>Ciência</li>
            <li>Piedade</li>
            <li>Temor de Deus</li>
          </ul>
        </div>

        {/* EDUCATION */}
        <div>

          <h3 className="font-semibold mb-4 border-b pb-2 text-sm sm:text-base">
            Depósito da Fé
          </h3>

          <ul className="space-y-2 text-sm">
            <li>Tradição</li>
            <li>Magistério</li>
            <li>Sagrada Escritura</li>
          </ul>

          <h3 className="font-semibold mt-8 mb-4 border-b pb-2 text-sm sm:text-base">
            Profissão de Fé
          </h3>

          <ul className="text-sm space-y-2">
            <li>Credo Niceno-Constantinopolitano</li>
            <li>Credo Apostólico</li>
          </ul>

        </div>

        {/* PRODUCTS */}
        <div>

          <h3 className="font-semibold mb-4 border-b pb-2 text-sm sm:text-base">
            Virtudes Teologais
          </h3>

          <ul className="space-y-2 text-sm">
            <li>Fé</li>
            <li>Esperança</li>
            <li>Caridade</li>
          </ul>

          <h3 className="font-semibold mt-8 mb-4 border-b pb-2 text-sm sm:text-base">
            Virtudes Cardeais
          </h3>

          <ul className="space-y-2 text-sm">
            <li>Prudência</li>
            <li>Justiça</li>
            <li>Fortaleza</li>
            <li>Temperança</li>
          </ul>

        </div>

        {/* CONTACT */}
        <div>

          <h3 className="font-semibold mb-4 border-b pb-2 text-sm sm:text-base">
            Contact
          </h3>

          <p className="text-sm break-words">
            Email: jovenseleutheria@gmail.com
          </p>

          <p className="text-sm mb-6">
            Phone: (19) 98109-7482
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex flex-col gap-4">

            <a
              href="https://www.instagram.com/jc.santaluzia/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition"
            >
              <div className="p-2 border rounded-full group-hover:bg-pink-500 group-hover:text-white transition">
                <Instagram size={18} />
              </div>

              <span className="group-hover:text-pink-500 text-sm sm:text-base">
                Instagram
              </span>
            </a>

            <a
              href="https://www.facebook.com/SantaLuziaHortolandia/?locale=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition"
            >
              <div className="p-2 border rounded-full group-hover:bg-blue-600 group-hover:text-white transition">
                <Facebook size={18} />
              </div>

              <span className="group-hover:text-blue-600 text-sm sm:text-base">
                Facebook
              </span>
            </a>

            <a
              href="https://wa.me/5599999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition"
            >
              <div className="p-2 border rounded-full group-hover:bg-green-500 group-hover:text-white transition">
                <MessageCircle size={18} />
              </div>

              <span className="group-hover:text-green-500 text-sm sm:text-base">
                WhatsApp
              </span>
            </a>

            <a
              href="https://www.youtube.com/@ParóquiaSantaLuziaHortolândia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition"
            >
              <div className="p-2 border rounded-full group-hover:bg-red-600 group-hover:text-white transition">
                <Youtube size={18} />
              </div>

              <span className="group-hover:text-red-600 text-sm sm:text-base">
                YouTube
              </span>
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
}