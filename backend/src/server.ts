import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectsRoutes from './routes/projects'; // <-- importando as rotas

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota de teste (opcional, pode manter)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Servidor funcionando!' });
});

// Usar rotas de projetos
app.use('/api/projects', projectsRoutes);

app.listen(port, () => {
  console.log(`🔥 Backend rodando em http://localhost:${port}`);
});