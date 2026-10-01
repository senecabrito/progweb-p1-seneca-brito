// Composição: a Conta cria e possui seu Extrato; cada extrato pertence a uma
// conta e acompanha o ciclo de vida dela. Em uma agregação, o Extrato poderia
// existir independentemente ou ser compartilhado entre contas.
//
// listar() retorna uma cópia do array para que quem consulta não possa incluir,
// remover ou reordenar diretamente os lançamentos privados.
export class Extrato {
  #lancamentos = [];

  registrar(tipo, valor) {
    this.#lancamentos.push({ tipo, valor, data: new Date() });
  }

  listar() {
    return [...this.#lancamentos];
  }
}
