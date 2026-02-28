"use client";

import { useState } from "react";
import Image from "next/image";

type DadosPagamento = {
  nome: string;
  restante: number;
  status: "PENDENTE" | "PARCIAL" | "PAGO";
};

export default function Pagamento() {

const [cpf,setCpf]=useState("");
const [dados,setDados]=useState<DadosPagamento|null>(null);
const [pagador,setPagador]=useState("");
const [valor,setValor]=useState("");
const [pix,setPix]=useState<string|null>(null);
const [erro,setErro]=useState("");
const [loading,setLoading]=useState(false);

/* ========= FORMATAR CPF ========= */

function formatCPF(value:string){
return value
.replace(/\D/g,"")
.replace(/(\d{3})(\d)/,"$1.$2")
.replace(/(\d{3})(\d)/,"$1.$2")
.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
.slice(0,14);
}

/* ========= CONSULTAR ========= */

async function consultar(){

setErro("");
setPix(null);
setLoading(true);

try{

const res=await fetch("/api/pagamento",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
tipo:"consulta",
cpf
})
});

const data=await res.json();

if(!res.ok){
setErro(data.error);
return;
}

setDados(data);

}catch{
setErro("Erro inesperado");
}
finally{
setLoading(false);
}
}

/* ========= GERAR PIX ========= */

async function gerarPix(){

if(!dados) return;

if(dados.status==="PAGO"){
setErro("Pagamento já realizado");
return;
}

if(!pagador){
setErro("Informe o nome do pagador");
return;
}

const valorNumero=Number(valor);

if(valorNumero<=0){
setErro("Informe um valor válido");
return;
}

if(valorNumero>dados.restante){
setErro("Valor maior que o restante");
return;
}

setErro("");

const res=await fetch("/api/pagamento",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
tipo:"gerar",
cpf,
valor:valorNumero,
pagador
})
});

const data=await res.json();

if(!res.ok){
setErro(data.error);
return;
}

setPix(data.pix.qrcode);
}

/* ========= UI ========= */

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 text-black">

<h1 className="text-2xl font-bold text-center">
Pagamento Eleutheria 2026
</h1>

<input
placeholder="Digite seu CPF"
value={cpf}
onChange={(e)=>setCpf(formatCPF(e.target.value))}
className="w-full border p-3 rounded-lg"
/>

<button
onClick={consultar}
disabled={loading}
className="w-full bg-blue-600 text-white p-3 rounded-lg"
>
{loading?"Consultando...":"Consultar"}
</button>

{erro && (
<p className="text-red-600 text-center font-semibold">
{erro}
</p>
)}

{/* ===== RESULTADO ===== */}

{dados && (

<div className="space-y-4 border-t pt-4">

<p><strong>Nome:</strong> {dados.nome}</p>

<p>
<strong>Status:</strong>{" "}
<span className={
dados.status==="PAGO"
? "text-green-600 font-bold"
: "text-orange-600 font-bold"
}>
{dados.status}
</span>
</p>

{/* ===== PAGAMENTO FINALIZADO ===== */}

{dados.status==="PAGO" && (
<div className="text-center">
<p className="text-green-600 font-bold text-lg">
✅ Pagamento confirmado
</p>
</div>
)}

{/* ===== AINDA PRECISA PAGAR ===== */}

{dados.status!=="PAGO" && (
<>
<p>
<strong>Valor restante:</strong> R$ {dados.restante.toFixed(2)}
</p>

<input
placeholder="Nome de quem fará o PIX"
value={pagador}
onChange={e=>setPagador(e.target.value)}
className="w-full border p-3 rounded-lg"
/>

<input
type="number"
placeholder="Valor que deseja pagar"
value={valor}
onChange={e=>setValor(e.target.value)}
className="w-full border p-3 rounded-lg"
/>

<button
onClick={gerarPix}
className="w-full bg-green-600 text-white p-3 rounded-lg"
>
Gerar PIX
</button>
</>
)}

</div>
)}

{/* ===== QR CODE ===== */}

{pix && (

<div className="space-y-4 text-center border-t pt-6">

<h2 className="font-bold">
⚠️ Informações Importantes
</h2>

<ul className="text-sm space-y-1">
<li>• O pagamento é identificado automaticamente.</li>
<li>• Não envie comprovante.</li>
<li>• Utilize apenas este QR Code.</li>
<li>• Após o pagamento o status será atualizado.</li>
</ul>

<div className="flex justify-center">
<Image
src={`data:image/png;base64,${pix}`}
alt="QR Code PIX"
width={260}
height={260}
/>
</div>

</div>
)}

</div>
</div>
);
}