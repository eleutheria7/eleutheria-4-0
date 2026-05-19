import Image from "next/image";

export default function Sobre() {
  return (
    <section
      id="sobre"
      className="relative py-16 sm:py-24 lg:py-32 bg-white"
    >

      {/* TÍTULO */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 text-center mb-14 sm:mb-20 lg:mb-24">
        <h1 className="text-3xl sm:text-4xl font-serif italic text-gray-900">
          Sobre nós
        </h1>
      </div>

      {/* Linha central somente desktop */}
      <div
        className="
          hidden lg:block
          absolute left-1/2
          top-[200px]
          h-[calc(100%-200px)]
          border-l-2 border-dashed border-black
          transform -translate-x-1/2
        "
      />

      <div className="space-y-16 sm:space-y-24 lg:space-y-40 relative z-10">

        {/* BLOCO 1 - DIREITA */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 flex justify-center lg:justify-end">
          <div className="w-full lg:w-[45%] text-left">

            <Image
              src="/fotos/Capa3.jpeg"
              alt="Missão"
              width={600}
              height={400}
              className="
                rounded-2xl
                object-cover
                w-full
                h-[250px]
                sm:h-[320px]
                lg:h-[350px]
                mb-5 lg:mb-6
              "
            />

            <h2 className="text-black text-2xl sm:text-3xl font-bold mb-4">
              Oque é o Eleutheria?
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              O Eleutheria é um retiro católico organizado pela juventude da Paróquia Santa Luzia de Hortolândia/SP, destinado a jovens de 14 a 30 anos.
              Criado especialmente para proporcionar dias de encontro verdadeiro com Deus!
            </p>

          </div>
        </div>

        {/* BLOCO 2 - ESQUERDA */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 flex justify-center lg:justify-start">
          <div className="w-full lg:w-[45%] text-left">

            <Image
              src="/fotos/Capa2.jpeg"
              alt="Experiência"
              width={600}
              height={400}
              className="
                rounded-2xl
                object-cover
                w-full
                h-[250px]
                sm:h-[320px]
                lg:h-[350px]
                mb-5 lg:mb-6
              "
            />

            <h2 className="text-black text-2xl sm:text-3xl font-bold mb-4">
              Oque é a palavra Eleutheria?
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {"Eleutheria"} é uma palavra grega (Ελευθερία) que significa {"liberdade"}. No contexto cristão, especialmente no catolicismo, o termo {"Eleutheria"} é usado para se referir à liberdade espiritual que vem da relação com Deus.
               Nesse sentido, a Eleutheria não se refere apenas à liberdade física ou política, mas sim à liberdade interior que permite que as pessoas vivam de acordo com a vontade de Deus e alcancem a plenitude da vida.
            </p>

          </div>
        </div>

        {/* BLOCO 3 - DIREITA */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 flex justify-center lg:justify-end">
          <div className="w-full lg:w-[45%] text-left">

            <Image
              src="/fotos/Capa4.jpeg"
              alt="Comunidade"
              width={600}
              height={400}
              className="
                rounded-2xl
                object-cover
                w-full
                h-[250px]
                sm:h-[320px]
                lg:h-[350px]
                mb-5 lg:mb-6
              "
            />

            <h2 className="text-black text-2xl sm:text-3xl font-bold mb-4">
              Sobre a essência do retiro
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Você tem uma oportunidade real de viver algo novo com Deus. Se reencontrar e sentir o amor de Deus de forma verdadeira. São dias cheios de alegria, paz e muita amizade.
              Nossa intenção no Eleutheria é te proporcionar dias marcantes na presença de Jesus Eucarístico e do Espírito Santo, para que você viva um verdadeiro encontro com o amor de Deus. 
            </p>

          </div>
        </div>

        {/* BLOCO 4 - ESQUERDA */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 flex justify-center lg:justify-start">
          <div className="w-full lg:w-[45%] text-left">

            <Image
              src="/fotos/Capa1.jpeg"
              alt="Transformação"
              width={600}
              height={400}
              className="
                rounded-2xl
                object-cover
                w-full
                h-[250px]
                sm:h-[320px]
                lg:h-[350px]
                mb-5 lg:mb-6
              "
            />

            <h2 className="text-black text-2xl sm:text-3xl font-bold mb-4">
              Por que participar do Eleuteria 2026?
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Vivemos cercados por distrações, pressa e preocupações que muitas vezes nos afastam daquilo que realmente importa. Participar desse retiro é parar por alguns dias, respirar e permitir que Deus fale ao seu coração. 
              É escolher viver algo diferente: momentos de oração, alegria, amizades sinceras e experiências que podem transformar sua vida. Talvez seja exatamente o tempo que você precisava para recomeçar.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}