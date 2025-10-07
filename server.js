import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/api/routes/auth.routes.js';
import usuariosRoutes from './src/api/routes/usuarios.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.listen(PORT, () => {
  console.log(`Servicio de Identidad corriendo en http://localhost:${PORT}`);
});