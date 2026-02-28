import { prisma } from "@/app/api/prisma";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {

  const body = await req.json();

  if (body.type === "payment") {

    const payment = new Payment(client);

    const data = await payment.get({
      id: body.data.id,
    });

    if (data.status === "approved") {

      const cpf = data.external_reference;

      await prisma.inscricao.update({
        where: { cpf },
        data: {
          statusPagamento: "PAGO",
          valorPago: 150,
        },
      });
    }
  }

  return new Response("ok");
}