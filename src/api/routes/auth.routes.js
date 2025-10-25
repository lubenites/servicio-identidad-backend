// src/api/routes/auth.routes.js (¡DEBE ESTAR ASÍ!)

import express from 'express';
// ✅ Importación con alias para capturar todas las funciones del controlador
import * as authController from '../../controllers/auth.controller.js'; 

const router = express.Router();

router.post('/register', authController.registrarUsuario);
router.post('/login', authController.iniciarSesion);

// Exportación por defecto
export default router;