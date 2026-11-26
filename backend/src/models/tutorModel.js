import { db } from '../db.js';

export const tutorModel = {
  listar() {
    return db.prepare('SELECT * FROM tutores ORDER BY id').all();
  },

  buscarPorId(id) {
    return db.prepare('SELECT * FROM tutores WHERE id = ?').get(id) ?? null;
  },

  existeEmail(email, ignorarId = null) {
    const linha = ignorarId === null
      ? db.prepare('SELECT 1 FROM tutores WHERE email = ?').get(email)
      : db.prepare('SELECT 1 FROM tutores WHERE email = ? AND id <> ?').get(email, ignorarId);
    return linha !== undefined;
  },

  inserir({ nome, email, telefone }) {
    const r = db
      .prepare('INSERT INTO tutores (nome, email, telefone) VALUES (?, ?, ?)')
      .run(nome, email, telefone ?? null);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare('UPDATE tutores SET nome = ?, email = ?, telefone = ? WHERE id = ?')
      .run(novo.nome, novo.email, novo.telefone ?? null, id);
    return this.buscarPorId(id);
  },

  remover(id) {
    return db.prepare('DELETE FROM tutores WHERE id = ?').run(id).changes > 0;
  },
};
