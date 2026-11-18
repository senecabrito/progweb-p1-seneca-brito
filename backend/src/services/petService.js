import { petModel } from '../models/petModel.js';
import { tutorModel } from '../models/tutorModel.js';
import { erro } from '../utils/erro.js';

const ESPECIES_VALIDAS = ['cão', 'gato', 'ave', 'outro'];

export const petService = {
  listar(tutorId) {
    if (tutorId === undefined) return petModel.listar();
    if (!Number.isInteger(tutorId) || tutorId < 1) throw erro(400, 'tutorId deve ser um número inteiro positivo');
    return petModel.listarPorTutor(tutorId);
  },

  buscarPorId(id) {
    const pet = petModel.buscarPorId(id);
    if (!pet) throw erro(404, 'Pet não encontrado');
    return pet;
  },

  criar({ nome, especie, raca, dataNascimento, tutorId } = {}) {
    if (!nome || !especie || tutorId === undefined) {
      throw erro(400, 'Campos "nome", "especie" e "tutorId" são obrigatórios');
    }
    if (!ESPECIES_VALIDAS.includes(especie)) {
      throw erro(400, `Espécie deve ser uma de: ${ESPECIES_VALIDAS.join(', ')}`);
    }
    const idTutor = Number(tutorId);
    if (!Number.isInteger(idTutor) || idTutor < 1) throw erro(400, 'tutorId deve ser um número inteiro positivo');
    if (!tutorModel.buscarPorId(idTutor)) throw erro(422, 'Tutor informado não existe');
    return petModel.inserir({ nome, especie, raca, dataNascimento, tutorId: idTutor });
  },

  atualizar(id, dados = {}) {
    if (dados.especie !== undefined && !ESPECIES_VALIDAS.includes(dados.especie)) {
      throw erro(400, `Espécie deve ser uma de: ${ESPECIES_VALIDAS.join(', ')}`);
    }
    if (dados.tutorId !== undefined) {
      const idTutor = Number(dados.tutorId);
      if (!Number.isInteger(idTutor) || idTutor < 1) throw erro(400, 'tutorId deve ser um número inteiro positivo');
      if (!tutorModel.buscarPorId(idTutor)) throw erro(422, 'Tutor informado não existe');
      dados = { ...dados, tutorId: idTutor };
    }
    const atualizado = petModel.atualizar(id, dados);
    if (!atualizado) throw erro(404, 'Pet não encontrado');
    return atualizado;
  },

  remover(id) {
    if (!petModel.remover(id)) throw erro(404, 'Pet não encontrado');
  },
};
