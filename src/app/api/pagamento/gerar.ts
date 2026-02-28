import { prisma } from "@/app/api/prisma";
import { MercadoPagoConfig, Payment } from "mercadopago";

type GerarPixParams = {
  cpf: string;
  valor: number;
  pagador: string;
};

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function gerarPix({
  cpf,
  valor,
  pagador,
}: GerarPixParams) {

const cpfLimpo = cpf.replace(/\D/g,"");

const inscricao = await prisma.inscricao.findUnique({
where:{ cpf: cpfLimpo }
});

if(!inscricao){
throw new Error("CPF inválido");
}

/* 🔥 BLOQUEIO ANTIFRAUDE */
if(inscricao.statusPagamento==="PAGO"){
throw new Error("Pagamento já realizado");
}

const restante =
inscricao.valorTotal - inscricao.valorPago;

if(valor>restante){
throw new Error("Valor maior que o restante");
}

const payment = new Payment(client);

const response = await payment.create({
body:{
transaction_amount:Number(valor),
description:"Eleutheria 2026",
payment_method_id:"pix",

payer:{
email:"pagamento@eleutheria.com",
first_name:pagador,
identification:{
type:"CPF",
number:cpfLimpo
}
},

external_reference:cpfLimpo
}
});

return{
qrcode:
response.point_of_interaction
?.transaction_data?.qr_code_base64,

copiaCola:
response.point_of_interaction
?.transaction_data?.qr_code
};
}