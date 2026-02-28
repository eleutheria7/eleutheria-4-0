"use client";

export default function LocalRetiro() {
  return (
    <section id="local" className="bg-white py-32">

      {/* TÍTULO */}
      <div className="max-w-6xl mx-auto px-10 text-center mb-24">
        <h1 className="text-4xl font-serif italic text-gray-900">
          Local
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* MAPA */}
        <div className="rounded-2xl overflow-hidden shadow-md h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d459.6789342124309!2d-47.4856583!3d-22.8235209!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c620e16ce44f5f%3A0xa87cd1be60590d50!2sCapela%20de%20Santo%20Antonio!5e0!3m2!1spt-BR!2sbr!4v1743472401460!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* TEXTO */}
        <div>
          <h2 className="text-4xl font-serif text-gray-900 mb-6">
            Local do Retiro
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            O Eleutheria 2026 acontecerá no Centro de Formação Religioso – Luiza G. Freguglia
          </p>

          <div className="mb-8">
            <p className="text-xl font-semibold text-gray-900">
              Rod. Saulo Waldemar Fornazin,
            </p>
            <p className="text-gray-600">
              Santo Antônio Sapezeiro <br />
              Santa Bárbara d´Oeste -SP <br />
              13458-820
            </p>
          </div>

          <a
            href="https://www.google.com/maps/place/Capela+de+Santo+Antonio/@-22.8236834,-47.4854643,21z/data=!4m6!3m5!1s0x94c620e16ce44f5f:0xa87cd1be60590d50!8m2!3d-22.8237375!4d-47.4855067!16s%2Fg%2F11dxkg3zq1?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="inline-block bg-emerald-400 hover:bg-emerald-500 transition px-6 py-2 rounded-full shadow-md"
          >
            Ver no mapa →
          </a>
        </div>
          
      </div>

    </section>
  );
}