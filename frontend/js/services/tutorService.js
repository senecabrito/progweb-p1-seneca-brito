import { api } from '../api.js';

function preparar({ nome, email, telefone }) {
  const dados = { nome: (nome ?? '').trim(), email: (email ?? '').trim(), telefone: (telefone ?? '').trim() || null };
  if (!dados.nome) throw new Error('Informe o nome do tutor.');
  if (!dados.email) throw new Error('Informe o e-mail do tutor.');
  return dados;
}

export const tutorService = {
  listar: () => api.get('/tutores'),
  async criar(dados) { return api.post('/tutores', preparar(dados)); },
  async atualizar(id, dados) { return api.put(`/tutores/${id}`, preparar(dados)); },
  remover: (id) => api.delete(`/tutores/${id}`),
};
