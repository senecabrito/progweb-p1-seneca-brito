import { tutorService } from '../services/tutorService.js';

export const tutorController = {
  listar(req, res) {
    res.json(tutorService.listar());
  },

  buscarPorId(req, res) {
    res.json(tutorService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const novo = tutorService.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar(req, res) {
    res.json(tutorService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    tutorService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
