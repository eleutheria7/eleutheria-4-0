"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Caveat } from "next/font/google";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

type Depoimento = {
  text: string;
  author: string;
  image: string;
};

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Depoimentos() {
  return (
    <section
      id="depoimentos"
      className="bg-white py-16 sm:py-24 lg:py-32"
    >
      {/* TÍTULO */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
        <h2 className="text-3xl sm:text-4xl font-serif italic text-gray-900">
          Testemunhos
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <Swiper
          modules={[Autoplay, Navigation]}
          centeredSlides
          loop
          slidesPerView="auto"
          spaceBetween={20}
          navigation
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              spaceBetween: 30,
            },
            1024: {
              spaceBetween: 60,
            },
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide
              key={index}
              className="
                !w-[92%]
                sm:!w-[650px]
                lg:!w-[750px]
              "
            >
              <Card {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function Card({ text, author, image }: Depoimento) {
  return (
    <div
      className="
        bg-gray-100
        rounded-2xl
        p-6 sm:p-8 lg:p-10
        min-h-[420px]
        lg:h-[450px]
        flex flex-col justify-between
        shadow-sm
        border border-black
      "
    >
      {/* PARTE SUPERIOR */}
      <div>
        <div className="text-3xl sm:text-4xl text-black leading-none">
          “
        </div>

        <p
          className="
            text-gray-700
            leading-relaxed
            text-sm sm:text-base
            mt-2
          "
        >
          {text}
        </p>
      </div>

      {/* PARTE INFERIOR */}
      <div>
        <div
          className={`${caveat.className} text-2xl sm:text-3xl text-black mb-2 mt-6`}
        >
          {author}
        </div>

        <div className="h-px bg-gray-400 w-full"></div>

        <div className="flex justify-end mt-4 sm:mt-6">
          <Image
            src={image}
            alt={author}
            width={56}
            height={56}
            className="rounded-full object-cover w-12 h-12 sm:w-14 sm:h-14"
          />
        </div>
      </div>
    </div>
  );
}

const cards: Depoimento[] = [
  {
    text: "Meu nome é Giovana tenho 17 anos, participei do retiro Eleutheria ano passado, me reconectei profundamente com Jesus de uma forma que nunca imaginei. Foi ali que, com o coração aberto, me entreguei de uma vez por todas à Ele. Lembro com carinho de todos os momentos em que senti Sua presença de maneira tão forte, como tudo que estava ao meu redor sumisse e fosse apenas eu e Ele. Eleutheria é muito mais que um retiro, é um tempo de cura e renovação. Cada oração, cada reflexão, cada momento de partilha, me aproximaram mais de Jesus e me ajudaram a entender o quanto Ele me ama.",
    author: "Giovana Schicovski",
    image: "/img_page/Giovana Schicovski.jpg",
  },
  {
    text: "Eu fui para este retiro bem como haviam pedido: de coração aberto, meu objetivo era aproveitar cada momento e prestar muita atenção nas pregações e homilias, e hoje eu posso dizer que, sim, eu aproveitei cada segundo, chorei, fiz novas amizades e tive vários momentos sentindo a presença de Jesus. Se eu pudesse descrever o Eleutheria de duas formas elas seriam: vida nova, porque ao sair de lá você sai com a motivação para ter uma vida nova, e também família, porque o motivo principal do meu choro foi ter percebido que as pessoas da igreja também são a minha família, e o tanto que nós acolhemos uns aos outros é lindo. Eu acho que todo mundo deveria viver essa experiência.",
    author: "Bruna Felix",
    image: "/img_page/bruna_felix.jpeg",
  },
  {
    text: "Eu me chamo Maria Natália, tenho 25 anos e o Eleutheria foi o meu primeiro retiro. Não participei de outros retiros por medo e insegurança, mas estava afastada da fé e decidi que era hora de mudar. E essa foi a melhor escolha! Conheci pessoas novas, me senti muito acolhida e acima de tudo, me reencontrei com Deus! Foi uma experiência infinitamente maravilhosa! Sinto que minha vida mudou completamente, após o retiro!",
    author: "Maria Natália",
    image: "/img_page/Natalia.jpg",
  },
  {
    text: "Me chamo Guilherme, tenho 23 anos, e havia me afastado de Deus por um longo tempo. Porém, o Eleutheria foi como uma guia para me reconectar e voltar para casa. No começo, senti um nervosismo de ir para um lugar onde não conhecia ninguém, mas, depois de fazer algumas novas amizades e viver tudo o que aconteceu lá, com tantas pessoas buscando reencontrar Deus e renovar sua fé, as pregações de pessoas incríveis me inspiraram muito. Hoje, não consigo mais imaginar minha vida fora da casa do Pai. Sem dúvida, participarei sempre que puder.",
    author: "Guilherme",
    image: "/img_page/Guilherme.jpg",
  },
  {
    text: "Me chamo Giovana, tenho 18 anos e com certeza o Eleutheria foi a melhor experiência da minha vida. O retiro onde eu conseguia ver Jesus em todas as pessoas, tanto as que serviram e se doaram muito para estar ali, quanto nos retirantes também. Tive minha primeira experiência pessoal com Cristo no retiro e nunca esqueço de nenhum momento que vivi ali, das palestras, das orações, dos momentos de adoração, do sorriso de cada um, da comida muito boa nunca me senti tão bem, acolhida e tão feliz em toda minha vida, mesmo. Eleutheria é uma benção, e grande graça do Senhor foi participar.",
    author: "Giovana Cruz",
    image: "img_page/Giovana Cruz.jpg",
  },
];