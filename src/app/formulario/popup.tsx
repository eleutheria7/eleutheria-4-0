"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InscricaoPopup({
  open,
  onClose,
}: Props) {

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0
        z-50
        flex items-center justify-center
        px-4
      "
    >

      {/* FUNDO ESCURECIDO */}
      <div
        className="
          absolute inset-0
          bg-black/40
          backdrop-blur-sm
        "
        onClick={onClose}
      />

      {/* POPUP */}
      <div
        className="
          relative
          bg-white
          rounded-3xl
          shadow-2xl

          p-5 sm:p-8

          w-full
          max-w-lg

          animate-[scaleIn_.25s_ease]
        "
        onClick={(e) => e.stopPropagation()}
      >

        {/* FECHAR */}
        <button
          onClick={onClose}
          aria-label="Fechar popup"
          className="
            absolute
            top-3 right-3
            sm:top-4 sm:right-4

            w-9 h-9

            flex items-center justify-center

            text-gray-500
            hover:text-black

            text-xl
            font-bold

            rounded-full

            transition
          "
        >
          ×
        </button>

        {/* TÍTULO */}
        <h2
          className="
            text-xl sm:text-2xl
            font-bold
            text-black
            mb-5 sm:mb-6
            text-center
            leading-snug
          "
        >
          ✅ Inscrição realizada com sucesso!
        </h2>

        {/* CONTEÚDO */}
        <div
          className="
            space-y-4
            text-black
            text-center
            leading-relaxed
            text-sm sm:text-base
          "
        >

          <p>
            Parabéns, sua inscrição foi concluída!
          </p>

          <p>
            Estamos muito felizes com sua participação e mal podemos esperar para te-lo(a) conosco.
          </p>

          <p>
            Em breve iremos entrar em contato para confirmar os detalhes do evento e fornecer as informações de pagamento.
          </p>

          <p>
            <strong>
              {"Fique atento(a) para as próximas informações"}
            </strong>
          </p>

          <p>
            Deus abençoe!
          </p>

        </div>

        {/* BOTÕES */}
        <div
          className="
            mt-6 sm:mt-8
            flex flex-col sm:flex-row
            gap-4
          "
        >

        </div>

      </div>
    </div>
  );
}