import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-red-500">
      <div className="relative h-24 flex items-center justify-center">

        {/* LOGO - esquerda */}
        <div className="absolute left-6">
          <Image
            src="/img_page/logo1.png"
            alt="Logo"
            width={120}
            height={120}
            className="h-16 w-auto object-contain"
            priority
          />
        </div>

        {/* MENU - centralizado REAL */}
        <nav className="text-gray-700 font-medium">
          <span>Sobre</span>
          <span className="mx-3 text-gray-400">|</span>
          <span>Testemunhos</span>
          <span className="mx-3 text-gray-400">|</span>
          <span>Fotos</span>
          <span className="mx-3 text-gray-400">|</span>
          <span>Local</span>
          <span className="mx-3 text-gray-400">|</span>
          <span>Contato</span>
        </nav>

      </div>
    </header>
  );
}
