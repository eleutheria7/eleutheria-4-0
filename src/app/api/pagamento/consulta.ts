import { prisma } from "@/app/api/prisma";

export async function consultarCpf(cpf: string) {

  const cpfLimpo = cpf.replace(/\D/g,"");

  const inscricao = await prisma.inscricao.findUnique({
    where:{ cpf: cpfLimpo }
  });

  if(!inscricao){
    throw new Error("CPF não encontrado");
  }

  const restante =
    inscricao.valorTotal - inscricao.valorPago;

  return {
    nome: inscricao.nome,
    restante,
    status: inscricao.statusPagamento
  };
}