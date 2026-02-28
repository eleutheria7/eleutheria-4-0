import { NextResponse } from "next/server";
import { consultarCpf } from "./consulta";
import { gerarPix } from "./gerar";

export async function POST(req:Request){

  try{

    const body = await req.json();

    const dados = await consultarCpf(body.cpf);

    const pix = await gerarPix({
      cpf: body.cpf,
      valor: dados.restante,
      pagador: dados.nome
    });

    return NextResponse.json({
      ...dados,
      pix
    });

  }catch(error){

    const message =
      error instanceof Error
        ? error.message
        : "Erro inesperado";

    return NextResponse.json(
      { error: message },
      { status:400 }
    );
  }
}