const el = {
  form: document.querySelector('#form-pet'), tutor: document.querySelector('#pet-tutor'), salvar: document.querySelector('#pet-salvar'),
  cancelar: document.querySelector('#pet-cancelar'), carregando: document.querySelector('#pets-carregando'),
  erro: document.querySelector('#pets-erro'), erroMsg: document.querySelector('#pets-erro-msg'),
  recarregar: document.querySelector('#pets-recarregar'), vazio: document.querySelector('#pets-vazio'),
  sucesso: document.querySelector('#pets-sucesso'), linhas: document.querySelector('#pets-linhas'),
};
let nomeDoTutor = new Map();

function celula(texto, classe = '') {
  const td = document.createElement('td'); td.textContent = texto ?? '—'; td.className = classe; return td;
}
function botao(texto, acao, id, classe) {
  const b = document.createElement('button'); b.type = 'button'; b.textContent = texto;
  b.className = `btn btn-sm ${classe}`; b.dataset.acao = acao; b.dataset.id = id; return b;
}
function linha(pet, editandoId) {
  const tr = document.createElement('tr'); if (pet.id === editandoId) tr.className = 'editando';
  const acoes = celula('', 'text-end text-nowrap');
  acoes.append(botao('Editar', 'editar', pet.id, 'btn-outline-primary me-1'), botao('Remover', 'remover', pet.id, 'btn-outline-danger'));
  tr.append(celula(pet.id), celula(pet.nome), celula(pet.especie), celula(pet.raca), celula(nomeDoTutor.get(pet.tutorId) ?? `tutor #${pet.tutorId} (removido)`), acoes);
  return tr;
}

export const petView = {
  preencherTutores(tutores) {
    nomeDoTutor = new Map(tutores.map((t) => [t.id, t.nome]));
    const escolhido = el.tutor.value;
    const opcoes = tutores.map((t) => new Option(`${t.nome} (#${t.id})`, t.id));
    el.tutor.replaceChildren(new Option('Selecione…', ''), ...opcoes);
    if (nomeDoTutor.has(Number(escolhido))) el.tutor.value = escolhido;
  },
  render({ status, pets, erro, editandoId, salvando }) {
    for (const [chave, estado] of [['carregando', 'carregando'], ['erro', 'erro'], ['vazio', 'vazio'], ['sucesso', 'sucesso']]) {
      el[chave].classList.toggle('d-none', status !== estado);
    }
    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...pets.map((p) => linha(p, editandoId)));
    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando ? 'Salvando…' : editandoId ? 'Salvar alterações' : 'Cadastrar pet';
    el.cancelar.classList.toggle('d-none', !editandoId);
  },
  preencherForm(pet) {
    el.form.tutorId.value = pet.tutorId; el.form.nome.value = pet.nome; el.form.especie.value = pet.especie;
    el.form.raca.value = pet.raca ?? ''; el.form.dataNascimento.value = pet.dataNascimento ?? ''; el.form.nome.focus();
  },
  limparForm() { el.form.reset(); },
  aoEnviar(fn) { el.form.addEventListener('submit', (evento) => { evento.preventDefault(); fn(Object.fromEntries(new FormData(el.form))); }); },
  aoCancelar(fn) { el.cancelar.addEventListener('click', fn); },
  aoRecarregar(fn) { el.recarregar.addEventListener('click', fn); },
  aoClicarNaLista({ editar, remover }) {
    el.linhas.addEventListener('click', (evento) => {
      const alvo = evento.target.closest('button[data-acao]'); if (!alvo) return;
      const id = Number(alvo.dataset.id); if (alvo.dataset.acao === 'editar') editar(id); if (alvo.dataset.acao === 'remover') remover(id);
    });
  },
};
