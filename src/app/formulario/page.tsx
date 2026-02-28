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

  /* ================= IDADE ================= */

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthdate(value);

    const age = calculateAge(new Date(value));

    if (age < 14) setAgeError("Idade mínima: 14 anos.");
    else setAgeError("");
  };

  /* ================= CEP ================= */

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

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (ageError) return;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch("/api/inscricao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    alert("Inscrição enviada!");

    formRef.current?.reset();
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 flex justify-center">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-10">

        <div className="text-center">
          <h1 className="text-4xl font-bold">ELEUTHERIA 2025</h1>
          <p className="italic text-gray-600 mt-2">
            “Eis a vontade de Deus: A vossa Santificação”
          </p>
          <p className="text-gray-500">I Tessalonicenses 4,3</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">

          {/* ================= DADOS ================= */}

          <section className="space-y-6">
            <h3 className="section-title">Dados do Retirante</h3>

            <FormField name="nome" label="Nome Completo" type="text" required />

            <FormField
              name="nascimento"
              label="Data de Nascimento"
              type="date"
              value={birthdate}
              onChange={handleDateChange}
              required
            />

            {ageError && <p className="text-red-600 text-sm">{ageError}</p>}

            <FormField
              name="sexo"
              label="Sexo"
              as="radio"
              options={[
                { value: "Masculino", label: "Masculino" },
                { value: "Feminino", label: "Feminino" },
              ]}
            />

            <FormField name="whatsapp" label="WhatsApp" type="text" required />

            <FormField
              name="estadoCivil"
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
                name="cep"
                label="CEP"
                type="text"
                onInput={handleCepChange}
                required
              />

              <FormField name="rua" label="Rua" value={address.rua} readOnly />
              <FormField name="numero" label="Número" type="number" required />
              <FormField name="complemento" label="Complemento" />

              <FormField name="bairro" label="Bairro" value={address.bairro} readOnly />
              <FormField name="cidade" label="Cidade" value={address.cidade} readOnly />
              <FormField name="estado" label="Estado" value={address.estado} readOnly />

            </div>
          </section>

          {/* ================= SACRAMENTOS ================= */}

          <section className="space-y-6">
            <h3 className="section-title">Sacramentos</h3>

            <FormField name="batismo" label="Batismo" as="radio"
              options={[{ value:"Sim",label:"Sim"},{ value:"Não",label:"Não"}]} />

            <FormField name="eucaristia" label="1° Eucaristia" as="radio"
              options={[{ value:"Sim",label:"Sim"},{ value:"Não",label:"Não"}]} />

            <FormField name="crisma" label="Crisma" as="radio"
              options={[{ value:"Sim",label:"Sim"},{ value:"Não",label:"Não"}]} />

            <FormField name="matrimonio" label="Matrimônio" as="radio"
              options={[{ value:"Sim",label:"Sim"},{ value:"Não",label:"Não"}]} />
          </section>

          {/* ================= SAÚDE ================= */}

          <section className="space-y-6">
            <h3 className="section-title">Saúde</h3>

            <FormField name="doenca" label="Doença crônica?" as="textarea" />
            <FormField name="alergia" label="Alergia?" as="textarea" />
            <FormField name="medicamento" label="Medicamento controlado?" as="textarea" />

            <FormField
              name="analgesico"
              label="Pode tomar analgésico?"
              as="radio"
              options={[
                { value:"Sim",label:"Sim"},
                { value:"Não",label:"Não"}
              ]}
            />

            <FormField name="restricoes" label="Outras restrições" as="textarea" />
          </section>

          {/* ================= COMPLEMENTAR ================= */}

          <section className="space-y-6">
            <h3 className="section-title">Informações Complementares</h3>

            <FormField name="paroquia" label="Paróquia/Comunidade" type="text" />

            <FormField
              name="conheceu"
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

            <FormField name="contatoEmergencia" label="Contato de Emergência" />
            <FormField name="nomeContato" label="Nome do contato" />

            <FormField
              name="autorizaImagem"
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
            text-white py-3 rounded-xl font-semibold shadow-lg transition"
          >
            Enviar Inscrição
          </button>

        </form>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-600">
            <FaArrowAltCircleLeft />
            Voltar para página inicial
          </Link>
        </div>

      </div>

      <FloatingWhatsAppButton />
    </div>
  );
}