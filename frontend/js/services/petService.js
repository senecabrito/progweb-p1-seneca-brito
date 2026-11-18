import { api } from '../api.js';

function preparar({ nome, especie, raca, dataNascimento, tutorId }) {
  const dados = { nome: (nome ?? '').trim(), especie, raca: (raca ?? '').trim() || null, dataNascimento: dataNascimento || null, tutorId: Number(tutorId) };
  if (!dados.nome) throw new Error('Informe o nome do pet.');
  if (!Number.isInteger(dados.tutorId) || dados.tutorId < 1) throw new Error('Selecione um tutor.');
  return dados;
}

export const petService = {
  listar: () => api.get('/pets'),
  async criar(dados) { return api.post('/pets', preparar(dados)); },
  async atualizar(id, dados) { return api.put(`/pets/${id}`, preparar(dados)); },
  remover: (id) => api.delete(`/pets/${id}`),
};
