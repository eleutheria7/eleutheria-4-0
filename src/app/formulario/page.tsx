"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import FormField from "../components/FormField";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";

export default function FormularioPage() {

const formRef = useRef<HTMLFormElement | null>(null);

const [birthdate,setBirthdate]=useState("");
const [ageError,setAgeError]=useState("");

const [address,setAddress]=useState({
rua:"",
bairro:"",
cidade:"",
estado:"",
});

/* ================= FORMATADORES ================= */

const formatCPF=(e:React.FormEvent<HTMLInputElement>)=>{
let v=e.currentTarget.value.replace(/\D/g,"");
v=v.replace(/(\d{3})(\d)/,"$1.$2");
v=v.replace(/(\d{3})(\d)/,"$1.$2");
v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2").substring(0,14);
e.currentTarget.value=v;
};

const formatPhone=(e:React.FormEvent<HTMLInputElement>)=>{
let v=e.currentTarget.value.replace(/\D/g,"");

v=v
.replace(/^(\d{2})(\d)/,"($1) $2")
.substring(0,15);

e.currentTarget.value=v;
};

/* ================= IDADE ================= */

const calculateAge=(date:Date)=>{
const today=new Date();
let age=today.getFullYear()-date.getFullYear();
const m=today.getMonth()-date.getMonth();

if(m<0||(m===0&&today.getDate()<date.getDate()))age--;

return age;
};

const handleDateChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
const value=e.target.value;
setBirthdate(value);

const age=calculateAge(new Date(value));
setAgeError(age<14?"Idade mínima: 14 anos.":"");
};

/* ================= CEP ================= */

const handleCepChange=async(e:React.FormEvent<HTMLInputElement>)=>{

let cep=e.currentTarget.value.replace(/\D/g,"");
cep=cep.replace(/(\d{5})(\d)/,"$1-$2").substring(0,9);
e.currentTarget.value=cep;

if(cep.length===9){

const response=await fetch(`https://viacep.com.br/ws/${cep.replace("-","")}/json/`);
const data=await response.json();

if(!data.erro){
setAddress({
rua:data.logradouro,
bairro:data.bairro,
cidade:data.localidade,
estado:data.uf,
});
}
}
};

/* ================= SUBMIT ================= */

const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{

e.preventDefault();
if(ageError)return;

const formData=new FormData(e.currentTarget);
const data=Object.fromEntries(formData.entries());

await fetch("/api",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data),
});

alert("Inscrição enviada!");
formRef.current?.reset();
};

/* ================= UI ================= */

return(
<div className="min-h-screen bg-gray-100 py-12 flex flex-col items-center px-4">

<div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-10 border-4 border-gray-300">

<div className="text-center">
<h1 className="text-4xl text-black font-bold">ELEUTHERIA 2026</h1>
<p className="italic text-black mt-2">
“Eis a vontade de Deus: A vossa Santificação”
</p>
</div>
<div className="bg-gray-100 text-black p-4 rounded-lg mb-8 space-y-2">
  <p>
    <strong>Data:</strong> 13, 14 e 15 de Junho de 2025
  </p>
</div>

<form ref={formRef} onSubmit={handleSubmit} className="space-y-10">

{/* ================= DADOS ================= */}

<section className="space-y-6">
<h3 className="section-title">Dados do Retirante</h3>

<FormField name="nome" label="Deus te chama pelo nome, qual é o seu? *" required />

<FormField name="cpf" label="CPF *" placeholder="000.000.000-00" onInput={formatCPF} required />

<FormField name="nascimento" label="Data de Nascimento *" type="date" value={birthdate} onChange={handleDateChange} required />

{ageError&&<p className="text-red-600">{ageError}</p>}

<FormField
name="sexo"
label="Sexo *"
as="radio"
required
options={[
{value:"Masculino",label:"Masculino"},
{value:"Feminino",label:"Feminino"},
]}
/>

<FormField name="whatsapp" label="WhatsApp *" placeholder="(19) 989327759" onInput={formatPhone} required />

<FormField
name="estadoCivil"
label="Estado Civil *"
as="select"
required
options={[
{value:"Solteiro",label:"Solteiro"},
{value:"Casado",label:"Casado"},
{value:"Divorciado",label:"Divorciado"},
{value:"Viúvo",label:"Viúvo"},
{value:"Amasiado",label:"Amasiado"},
]}
/>

<FormField name="religiao" label="Religião (se tiver) *" required />

</section>

{/* ================= ENDEREÇO ================= */}

<section className="space-y-6">
<h3 className="section-title">Endereço Completo</h3>

<div className="grid md:grid-cols-2 gap-5">

<FormField name="cep" label="CEP *" placeholder="00000-000" onInput={handleCepChange} required />

<FormField name="rua" label="Rua *" value={address.rua} readOnly required />

<FormField name="numero" label="Número *" required />

<FormField name="complemento" label="Complemento" />

<FormField name="bairro" label="Bairro *" value={address.bairro} readOnly required />

<FormField name="cidade" label="Cidade *" value={address.cidade} readOnly required />

<FormField name="estado" label="Estado *" value={address.estado} readOnly required />

</div>

</section>

{/* ================= SACRAMENTOS ================= */}

<section className="space-y-6">
<h3 className="section-title">Sacramentos</h3>

{["batismo","eucaristia","crisma","matrimonio"].map((item)=>(
<FormField
key={item}
name={item}
label={`${item.charAt(0).toUpperCase()+item.slice(1)} *`}
as="radio"
required
options={[
{value:"Sim",label:"Sim"},
{value:"Não",label:"Não"},
]}
/>
))}

<FormField name="paroquia" label="Paróquia/Comunidade *" required />

</section>

{/* ================= SAÚDE ================= */}

<section className="space-y-6">
<h3 className="section-title">Saúde</h3>

<FormField name="doenca" label="Possui doença crônica? *" as="textarea" required />

<FormField name="alergia" label="Possui alergia? *" as="textarea" required />

<FormField name="medicamento" label="Faz uso de medicamento controlado? *" as="textarea" required />

<FormField
name="analgesico"
label="Pode tomar analgésico? *"
as="radio"
required
options={[
{value:"Sim",label:"Sim"},
{value:"Não",label:"Não"},
]}
/>

<FormField name="restricoes" label="Outras restrições *" as="textarea" required />

</section>

{/* ================= COMPLEMENTAR ================= */}

<section className="space-y-6">
<h3 className="section-title">Informações Complementares</h3>

<FormField
name="conheceu"
label="Como conheceu o Eleutheria? *"
as="select"
required
options={[
{value:"Instagram",label:"Instagram"},
{value:"Amigos",label:"Amigos"},
{value:"Pais",label:"Pais"},
{value:"Missa",label:"Missa"},
{value:"Outro",label:"Outro"},
]}
/>

<FormField
name="contatoEmergencia"
label="Contato de emergência *"
placeholder="(19) 989327759"
onInput={formatPhone}
required
/>

<FormField name="nomeContato" label="Nome do contato de emergência *" required />

<FormField
name="autorizaImagem"
label="Autoriza o uso de imagem? *"
as="radio"
required
options={[
{value:"Sim",label:"Sim, autorizo"},
{value:"Não",label:"Não autorizo"},
]}
/>

</section>

<div className="pt-12">
<button type="submit" style={{background:"green", color:"white"}}
className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-700">
Enviar Inscrição
</button>
</div>

</form>

<div className="text-center">
<Link href="/" className="inline-flex items-center gap-2 text-emerald-600">
<FaArrowAltCircleLeft/>
Voltar para página inicial
</Link>
</div>

</div>

<FloatingWhatsAppButton/>

</div>
);
}