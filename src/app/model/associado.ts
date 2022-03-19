export class Associado {
    nome: string;
    cpf: string;
    pauta?: number;
    constructor(nome: string, cpf: string) {
        this.nome = nome;
        this.cpf = cpf;
      }
  }