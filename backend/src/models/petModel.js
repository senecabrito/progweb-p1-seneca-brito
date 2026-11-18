let pets = [];
let proximoId = 1;

export const petModel = {
  listar() {
    return pets;
  },

  listarPorTutor(tutorId) {
    return pets.filter((pet) => pet.tutorId === tutorId);
  },

  buscarPorId(id) {
    return pets.find((pet) => pet.id === id) ?? null;
  },

  inserir({ nome, especie, raca, dataNascimento, tutorId }) {
    const novo = { id: proximoId++, nome, especie, raca: raca ?? null, dataNascimento: dataNascimento ?? null, tutorId };
    pets.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const indice = pets.findIndex((pet) => pet.id === id);
    if (indice === -1) return null;
    pets[indice] = { ...pets[indice], ...dados, id };
    return pets[indice];
  },

  remover(id) {
    const quantidadeAntes = pets.length;
    pets = pets.filter((pet) => pet.id !== id);
    return pets.length < quantidadeAntes;
  },
};
