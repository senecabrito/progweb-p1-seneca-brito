let tutores = [];
let proximoId = 1;

export const tutorModel = {
  listar() {
    return tutores;
  },

  buscarPorId(id) {
    return tutores.find((tutor) => tutor.id === id) ?? null;
  },

  existeEmail(email, ignorarId = null) {
    return tutores.some((tutor) => tutor.email === email && tutor.id !== ignorarId);
  },

  inserir({ nome, email, telefone }) {
    const novo = { id: proximoId++, nome, email, telefone: telefone ?? null };
    tutores.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const indice = tutores.findIndex((tutor) => tutor.id === id);
    if (indice === -1) return null;
    tutores[indice] = { ...tutores[indice], ...dados, id };
    return tutores[indice];
  },

  remover(id) {
    const quantidadeAntes = tutores.length;
    tutores = tutores.filter((tutor) => tutor.id !== id);
    return tutores.length < quantidadeAntes;
  },
};
