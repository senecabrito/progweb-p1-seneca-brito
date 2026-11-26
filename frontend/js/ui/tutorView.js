const el = {
  form: document.querySelector('#form-tutor'), salvar: document.querySelector('#tutor-salvar'),
  cancelar: document.querySelector('#tutor-cancelar'), carregando: document.querySelector('#tutores-carregando'),
  erro: document.querySelector('#tutores-erro'), erroMsg: document.querySelector('#tutores-erro-msg'),
  recarregar: document.querySelector('#tutores-recarregar'), vazio: document.querySelector('#tutores-vazio'),
  sucesso: document.querySelector('#tutores-sucesso'), linhas: document.querySelector('#tutores-linhas'),
};

function celula(texto, classe = '') {
  const td = document.createElement('td'); td.textContent = texto ?? '—'; td.className = classe; return td;
}
function botao(texto, acao, id, classe) {
  const b = document.createElement('button'); b.type = 'button'; b.textContent = texto;
  b.className = `btn btn-sm ${classe}`; b.dataset.acao = acao; b.dataset.id = id; return b;
}
function linha(tutor, editandoId) {
  const tr = document.createElement('tr'); if (tutor.id === editandoId) tr.className = 'editando';
  const acoes = celula('', 'text-end text-nowrap');
  acoes.append(botao('Editar', 'editar', tutor.id, 'btn-outline-primary me-1'), botao('Remover', 'remover', tutor.id, 'btn-outline-danger'));
  tr.append(celula(tutor.id), celula(tutor.nome), celula(tutor.email), celula(tutor.telefone), acoes); return tr;
}

export const tutorView = {
  render({ status, tutores, erro, editandoId, salvando }) {
    for (const [chave, estado] of [['carregando', 'carregando'], ['erro', 'erro'], ['vazio', 'vazio'], ['sucesso', 'sucesso']]) {
      el[chave].classList.toggle('d-none', status !== estado);
    }
    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...tutores.map((t) => linha(t, editandoId)));
    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando ? 'Salvando…' : editandoId ? 'Salvar alterações' : 'Cadastrar tutor';
    el.cancelar.classList.toggle('d-none', !editandoId);
  },
  preencherForm(tutor) { el.form.nome.value = tutor.nome; el.form.email.value = tutor.email; el.form.telefone.value = tutor.telefone ?? ''; el.form.nome.focus(); },
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
