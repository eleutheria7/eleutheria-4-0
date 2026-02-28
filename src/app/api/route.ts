import { NextResponse } from "next/server";
import { prisma } from "./prisma";
import { Prisma, Inscricao } from "@prisma/client";

/* ================= POST ================= */

export async function POST(req: Request) {

  const data: Inscricao = await req.json();

  try {

    /* ========= SALVA NO BANCO ========= */

    await prisma.inscricao.create({
      data: {
        ...data,
        cpf: data.cpf.replace(/\D/g,""),

      },
    });

    /* ========= ENVIA PARA GOOGLE FORMS ========= */

    await enviarGoogleForms(data);

    return NextResponse.json({
      success: true,
      message: "Inscrição realizada com sucesso",
    });

  } catch (error) {

    /* CPF DUPLICADO */
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "CPF já inscrito." },
        { status: 400 }
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "Erro ao realizar inscrição." },
      { status: 500 }
    );
  }
}

/* ================= GOOGLE FORMS ================= */

async function enviarGoogleForms(data: Inscricao) {

  try {

    await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSchDI0MH83n-kWHTBYCpKgZwpnqs1qMc9K6sb_4FOUHKm2Shw/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({

          "entry.1535034637": data.nome,
          "entry.215175828": data.cpf,
          "entry.51056734": data.nascimento,
          "entry.594663434": data.sexo,
          "entry.1397532717": data.whatsapp,
          "entry.1998595048": data.estadoCivil,
          "entry.1420864197": data.religiao,

          "entry.1258611879": data.cep,
          "entry.275669570": data.rua,
          "entry.206359177": data.numero,
          "entry.1620628174": data.complemento ?? "",
          "entry.1827633647": data.bairro,
          "entry.252207222": data.cidade,
          "entry.169791573": data.estado,

          "entry.1062544006": data.batismo,
          "entry.494952937": data.eucaristia,
          "entry.633295098": data.crisma,
          "entry.751901408": data.matrimonio,
          "entry.185868768": data.paroquia,

          "entry.297646185": data.doenca,
          "entry.252422887": data.alergia,
          "entry.770932675": data.medicamento,
          "entry.822009504": data.analgesico,
          "entry.296201086": data.restricoes,

          "entry.579507263": data.conheceu,
          "entry.1551602519": data.contatoEmergencia,
          "entry.1163156986": data.nomeContato,
          "entry.11817214": data.autorizaImagem,
        }),
      }
    );

  } catch {
    /* não quebra inscrição se Google falhar */
    console.log("Google Forms falhou, mas inscrição salva.");
  }
}