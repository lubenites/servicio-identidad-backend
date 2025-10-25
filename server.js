// server.js (CORREGIDO)

import express from 'express';
import 'dotenv/config'; 
import './src/config/database.js'; 

// ✅ CORRECCIÓN: Usamos importación con alias (*) para ambas rutas.
// Esto funciona si la ruta usa 'export default' o exporta varias cosas.
import * as authRoutes from './src/api/routes/auth.routes.js';
import * as usuariosRoutes from './src/api/routes/usuarios.routes.js'; 

const app = express();
const PORT = process.env.PORT || 3001; 

// Middlewares Globales
app.use(express.json()); 

// Rutas: Debemos acceder a la propiedad 'default' para obtener el router
app.use('/api/v1/identidad', authRoutes.default); 
app.use('/api/v1/identidad/usuarios', usuariosRoutes.default); 

// Manejador de ruta no encontrada (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada.' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Microservicio de Identidad corriendo en http://localhost:${PORT}`);
});