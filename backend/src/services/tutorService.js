import { tutorModel } from '../models/tutorModel.js';
import { erro } from '../utils/erro.js';

export const tutorService = {
  listar() {
    return tutorModel.listar();
  },

  buscarPorId(id) {
    const tutor = tutorModel.buscarPorId(id);
    if (!tutor) throw erro(404, 'Tutor não encontrado');
    return tutor;
  },

  criar({ nome, email, telefone } = {}) {
    if (!nome || !email) throw erro(400, 'Campos "nome" e "email" são obrigatórios');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw erro(400, 'E-mail inválido');
    if (tutorModel.existeEmail(email)) throw erro(409, 'Já existe um tutor com este e-mail');
    return tutorModel.inserir({ nome, email, telefone });
  },

  atualizar(id, dados = {}) {
    if (dados.email !== undefined) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) throw erro(400, 'E-mail inválido');
      if (tutorModel.existeEmail(dados.email, id)) throw erro(409, 'Já existe um tutor com este e-mail');
    }
    const atualizado = tutorModel.atualizar(id, dados);
    if (!atualizado) throw erro(404, 'Tutor não encontrado');
    return atualizado;
  },

  remover(id) {
    if (!tutorModel.remover(id)) throw erro(404, 'Tutor não encontrado');
  },
};
