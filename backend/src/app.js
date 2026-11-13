import express from 'express';
import tutoresRouter from './routes/tutores.js';
import petsRouter from './routes/pets.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ api: 'Clínica Veterinária API', versao: '1.0.0', rotas: ['/tutores', '/pets'] });
});

app.use('/tutores', tutoresRouter);
app.use('/pets', petsRouter);

app.use((req, res) => {
  res.status(404).json({ erro: `Rota ${req.method} ${req.url} não existe` });
});

app.use(errorHandler);

export default app;
