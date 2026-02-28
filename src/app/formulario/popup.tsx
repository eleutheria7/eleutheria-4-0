"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InscricaoPopup({ open, onClose }: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* FUNDO ESCURECIDO */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* POPUP */}
      <div
        className="
          relative
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
          w-[90%]
          max-w-lg
          animate-[scaleIn_.25s_ease]
        "
        onClick={(e) => e.stopPropagation()}
      >

        {/* FECHAR */}
        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            text-gray-500
            hover:text-black
            text-xl
            font-bold
          "
        >
          ×
        </button>

        {/* TÍTULO */}
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          ✅ Inscrição realizada com sucesso!
        </h2>

        {/* CONTEÚDO */}
        <div className="space-y-4 text-black text-center leading-relaxed">

          <p>
            Parabéns, sua inscrição foi concluída!
          </p>

          <p>
            Caso deseje, você pode realizar o pagamento agora mesmo
            clicando no botão abaixo.
          </p>

          <p>Ou poderá realizar o pagamento posteriormente utilizando o botão
          </p>
          <p><strong>{"Já fiz a inscrição, desejo realizar o pagamento "}</strong>
          </p> 
          <p>localizado no topo deste que acabou de preencher.
          </p>

        </div>

        {/* BOTÕES */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">

          <button style={{background:"blue", color:"white"}}
            onClick={onClose}
            className="
              flex-1
              bg-gray-100
              hover:bg-gray-200
              text-black
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            💳 Realizar Pagamento Agora
          </button>

        </div>

      </div>
    </div>
  );
}