import Image from "next/image";

export default function Sobre() {
  return (
    <section id="sobre" className="relative py-32 bg-white">

      {/* TÍTULO */}
      <div className="max-w-6xl mx-auto px-10 text-center mb-24">
        <h1 className="text-4xl font-serif italic text-gray-900">
          Sobre nós
        </h1>
      </div>

      {/* Linha central pontilhada */}
      <div className="absolute left-1/2 top-[200px] h-[calc(100%-200px)] border-l-2 border-dashed border-gray-300 transform -translate-x-1/2"></div>

      <div className="space-y-40 relative z-10">

        {/* BLOCO 1 - DIREITA */}
        <div className="max-w-6xl mx-auto px-10 flex justify-end">
          <div className="w-[45%] text-left">
            <Image
              src="/img_page/Imagem1.jpg"
              alt="Missão"
              width={600}
              height={400}
              className="rounded-2xl object-cover w-full h-[350px] mb-6"
            />

            <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Eleutheria nasce do desejo profundo de proporcionar um encontro
              verdadeiro com Deus. Um retiro pensado para transformar,
              libertar e renovar corações.
            </p>
          </div>
        </div>

        {/* BLOCO 2 - ESQUERDA */}
        <div className="max-w-6xl mx-auto px-10 flex justify-start">
          <div className="w-[45%] text-left">
            <Image
              src="/img_page/Imagem2.jpg"
              alt="Experiência"
              width={600}
              height={400}
              className="rounded-2xl object-cover w-full h-[350px] mb-6"
            />

            <h2 className="text-3xl font-bold mb-4">Uma Experiência Única</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Mais do que um evento, é uma experiência de fé, comunhão
              e espiritualidade profunda.
            </p>
          </div>
        </div>

        {/* BLOCO 3 - DIREITA */}
        <div className="max-w-6xl mx-auto px-10 flex justify-end">
          <div className="w-[45%] text-left">
            <Image
              src="/img_page/Imagem27.jpg"
              alt="Comunidade"
              width={600}
              height={400}
              className="rounded-2xl object-cover w-full h-[350px] mb-6"
            />

            <h2 className="text-3xl font-bold mb-4">Comunidade</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Pessoas reunidas pelo mesmo propósito: buscar a Deus com
              intensidade e verdade.
            </p>
          </div>
        </div>

        {/* BLOCO 4 - ESQUERDA */}
        <div className="max-w-6xl mx-auto px-10 flex justify-start">
          <div className="w-[45%] text-left">
            <Image
              src="/img_page/Imagem3.jpg"
              alt="Transformação"
              width={600}
              height={400}
              className="rounded-2xl object-cover w-full h-[350px] mb-6"
            />

            <h2 className="text-3xl font-bold mb-4">Transformação</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Um marco espiritual que pode mudar sua caminhada para sempre.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
