import {
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    
    <footer className="bg-white text-gray-800 px-10 py-16 ">
      <hr className="w-48 mx-auto mb-20 border-t border-neutral-200" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">
        

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold tracking-widest">
            PARÓQUIA SANTA LUZIA
          </h2>

          <p className="text-sm max-w-xs">
            Grupo de jovens.
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
                className="flex justify-between items-center w-full border-2 border-black rounded-full px-5 py-2 hover:bg-black hover:text-white transition"
              >
                {btn}
                <span>→</span>
              </button>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="font-semibold mb-4 border-b pb-2">Dons do Espirito Santo</h3>
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
          <h3 className="font-semibold mb-4 border-b pb-2">Depósito da Fé</h3>
          <ul className="space-y-2 text-sm">
            <li>Tradição</li>
            <li>Magistério</li>
            <li>Sagrada Escritura</li>
          </ul>

          <h3 className="font-semibold mt-8 mb-4 border-b pb-2">
            Profissão de Fé
          </h3>
          <ul className="text-sm">
            <li>Credo Niceno-Constantinopolitano</li>
            <li>Credo Apostólico</li>
          </ul>
        </div>

        {/* PRODUCTS */}
        <div>
          <h3 className="font-semibold mb-4 border-b pb-2">Virtudes Teologais</h3>
          <ul className="space-y-2 text-sm">
            <li>Fé</li>
            <li>Esperança</li>
            <li>Caridade</li>
          </ul>

          <h3 className="font-semibold mt-8 mb-4 border-b pb-2">Virtudes Cardeais</h3>
          <ul className="space-y-2 text-sm">
            <li>Prudência</li>
            <li>Justiça</li>
            <li>Fortaleza</li>
            <li>Temperança</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4 border-b pb-2">Contact</h3>

          <p className="text-sm">
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
              <span className="group-hover:text-pink-500">
                Instagram
              </span>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition"
            >
              <div className="p-2 border rounded-full group-hover:bg-blue-600 group-hover:text-white transition">
                <Facebook size={18} />
              </div>
              <span className="group-hover:text-blue-600">
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
              <span className="group-hover:text-green-500">
                WhatsApp
              </span>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition"
            >
              <div className="p-2 border rounded-full group-hover:bg-red-600 group-hover:text-white transition">
                <Youtube size={18} />
              </div>
              <span className="group-hover:text-red-600">
                YouTube
              </span>
            </a>
          </div>
        </div>
        

      </div>
    </footer>
  );
}