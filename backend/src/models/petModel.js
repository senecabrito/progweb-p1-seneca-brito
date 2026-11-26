import { db } from '../db.js';

const COLUNAS = `id, nome, especie, raca,
  data_nascimento AS dataNascimento, tutor_id AS tutorId`;

export const petModel = {
  listar() {
    return db.prepare(`SELECT ${COLUNAS} FROM pets ORDER BY id`).all();
  },

  listarPorTutor(tutorId) {
    return db
      .prepare(`SELECT ${COLUNAS} FROM pets WHERE tutor_id = ? ORDER BY id`)
      .all(tutorId);
  },

  buscarPorId(id) {
    return db.prepare(`SELECT ${COLUNAS} FROM pets WHERE id = ?`).get(id) ?? null;
  },

  inserir({ nome, especie, raca, dataNascimento, tutorId }) {
    const r = db
      .prepare(`INSERT INTO pets (nome, especie, raca, data_nascimento, tutor_id)
                VALUES (?, ?, ?, ?, ?)`)
      .run(nome, especie, raca ?? null, dataNascimento ?? null, Number(tutorId));
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare(`UPDATE pets
                SET nome = ?, especie = ?, raca = ?, data_nascimento = ?, tutor_id = ?
                WHERE id = ?`)
      .run(novo.nome, novo.especie, novo.raca ?? null, novo.dataNascimento ?? null,
        Number(novo.tutorId), id);
    return this.buscarPorId(id);
  },

  remover(id) {
    return db.prepare('DELETE FROM pets WHERE id = ?').run(id).changes > 0;
  },
};
