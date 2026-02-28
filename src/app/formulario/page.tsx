"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import FormField from "../components/FormField";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";

export default function FormularioPage() {

  const formRef = useRef<HTMLFormElement | null>(null);

  const [birthdate, setBirthdate] = useState("");

  const [ageError, setAgeError] = useState("");

  const [address, setAddress] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  /* ================= CALCULAR IDADE ================= */

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const value = e.target.value;
    setBirthdate(value);

    const age = calculateAge(new Date(value));

    if (age < 14) {
      setAgeError("Idade mínima: 14 anos.");
    } else {
      setAgeError("");
    }
  };

  /* ================= CEP AUTOMÁTICO ================= */

  const handleCepChange = async (
    e: React.FormEvent<HTMLInputElement>
  ) => {

    let cep = e.currentTarget.value.replace(/\D/g, "");

    cep = cep.replace(/(\d{5})(\d)/, "$1-$2").substring(0, 9);
    e.currentTarget.value = cep;

    if (cep.length === 9) {

      const response = await fetch(
        `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
      );

      const data = await response.json();

      if (!data.erro) {
        setAddress({
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        });
      }
    }
  };

  /* ================= SUBMIT FAKE ================= */

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (ageError) return;

    console.log("Formulário preenchido (sem envio backend)");

    formRef.current?.reset();

    setAddress({
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
    });
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 flex justify-center">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-10">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">ELEUTHERIA 2025</h1>
          <p className="italic text-gray-600 mt-2">
            “Eis a vontade de Deus: A vossa Santificação”
          </p>
          <p className="text-gray-500">I Tessalonicenses 4,3</p>
        </div>

        {/* INFO */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-sm space-y-2">
          <p><strong>Data:</strong> 20–22 Junho</p>
          <p><strong>Cidade:</strong> Santa Bárbara d’Oeste</p>
          <p><strong>Faixa etária:</strong> 14–30 anos</p>
          <p><strong>Valor:</strong> R$100</p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-10"
        >

          {/* ================= DADOS ================= */}
          <section className="space-y-6">
            <h3 className="section-title">Dados do Retirante</h3>

            <FormField label="Nome Completo" type="text" required />

            <FormField
              label="Data de Nascimento"
              type="date"
              value={birthdate}
              onChange={handleDateChange}
              required
            />

            {ageError && (
              <p className="text-red-600 text-sm">{ageError}</p>
            )}

            <FormField
              label="Sexo"
              as="radio"
              options={[
                { value: "Masculino", label: "Masculino" },
                { value: "Feminino", label: "Feminino" },
              ]}
            />

            <FormField label="WhatsApp" type="text" required />

            <FormField
              label="Estado Civil"
              as="select"
              options={[
                { value: "Solteiro", label: "Solteiro" },
                { value: "Casado", label: "Casado" },
                { value: "Divorciado", label: "Divorciado" },
                { value: "Viúvo", label: "Viúvo" },
                { value: "Amasiado", label: "Amasiado" },
              ]}
            />
          </section>

          {/* ================= ENDEREÇO ================= */}
          <section className="space-y-6">
            <h3 className="section-title">Endereço</h3>

            <div className="grid md:grid-cols-2 gap-4">

              <FormField
                label="CEP"
                type="text"
                onInput={handleCepChange}
                required
              />

              <FormField label="Rua" value={address.rua} readOnly />

              <FormField label="Número" type="number" required />

              <FormField label="Complemento" type="text" />

              <FormField label="Bairro" value={address.bairro} readOnly />

              <FormField label="Cidade" value={address.cidade} readOnly />

              <FormField label="Estado" value={address.estado} readOnly />

            </div>
          </section>

          {/* ================= SACRAMENTOS ================= */}
          <section className="space-y-6">
            <h3 className="section-title">Sacramentos</h3>

            <FormField label="Batismo" as="radio"
              options={[{ value:"Sim",label:"Sim"},{ value:"Não",label:"Não"}]} />

            <FormField label="1° Eucaristia" as="radio"
              options={[{ value:"Sim",label:"Sim"},{ value:"Não",label:"Não"}]} />

            <FormField label="Crisma" as="radio"
              options={[{ value:"Sim",label:"Sim"},{ value:"Não",label:"Não"}]} />

            <FormField label="Matrimônio" as="radio"
              options={[{ value:"Sim",label:"Sim"},{ value:"Não",label:"Não"}]} />
          </section>

          {/* ================= SAÚDE ================= */}
          <section className="space-y-6">
            <h3 className="section-title">Saúde</h3>

            <FormField label="Doença crônica?" as="textarea" />
            <FormField label="Alergia?" as="textarea" />
            <FormField label="Medicamento controlado?" as="textarea" />

            <FormField
              label="Pode tomar analgésico?"
              as="radio"
              options={[
                { value:"Sim",label:"Sim"},
                { value:"Não",label:"Não"}
              ]}
            />

            <FormField label="Outras restrições" as="textarea" />
          </section>

          {/* ================= COMPLEMENTAR ================= */}
          <section className="space-y-6">
            <h3 className="section-title">Informações Complementares</h3>

            <FormField label="Paróquia/Comunidade" type="text" />

            <FormField
              label="Como conheceu o Eleutheria?"
              as="select"
              options={[
                { value:"Instagram",label:"Instagram"},
                { value:"Amigos",label:"Convite de amigos"},
                { value:"Pais",label:"Convite dos pais"},
                { value:"Missa",label:"Aviso na Missa"},
                { value:"Outro",label:"Outro"},
              ]}
            />

            <FormField label="Contato de Emergência" type="text" />
            <FormField label="Nome do contato" type="text" />

            <FormField
              label="Autoriza uso de imagem?"
              as="radio"
              options={[
                { value:"Sim",label:"Sim, autorizo"},
                { value:"Não",label:"Não autorizo"},
              ]}
            />
          </section>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600
            text-white py-3 rounded-xl font-semibold
            shadow-lg transition hover:scale-[1.02]"
          >
            Enviar Inscrição
          </button>

        </form>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-500"
          >
            <FaArrowAltCircleLeft />
            Voltar para página inicial
          </Link>
        </div>

      </div>

      <FloatingWhatsAppButton />

    </div>
  );
}