import { NextResponse } from "next/server";
import { prisma } from "./prisma";

export async function POST(req: Request) {

  try {

    const data = await req.json();

    const inscricao = await prisma.inscricao.create({
      data: {

        nome: data.nome,
        cpf: data.cpf,
        nascimento: data.nascimento,
        sexo: data.sexo,
        whatsapp: data.whatsapp,
        estadoCivil: data.estadoCivil,
        religiao: data.religiao,

        cep: data.cep,
        rua: data.rua,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,

        batismo: data.batismo,
        eucaristia: data.eucaristia,
        crisma: data.crisma,
        matrimonio: data.matrimonio,
        paroquia: data.paroquia,

        doenca: data.doenca,
        alergia: data.alergia,
        medicamento: data.medicamento,
        analgesico: data.analgesico,
        restricoes: data.restricoes,

        conheceu: data.conheceu,
        contatoEmergencia: data.contatoEmergencia,
        nomeContato: data.nomeContato,
        autorizaImagem: data.autorizaImagem,
      },
    });

    return NextResponse.json({
      success: true,
      inscricao,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Erro ao salvar inscrição" },
      { status: 500 }
    );
  }
}