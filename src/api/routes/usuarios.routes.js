// src/api/routes/usuarios.routes.js (Añadir la nueva ruta)

import express from 'express';
const router = express.Router();
import * as authMiddleware from '../../middleware/auth.middleware.js';
import * as usuariosController from '../../controllers/usuarios.controller.js';

// ... (otras rutas, como /perfil y /admin/crear) ...

// ✅ RUTA NUEVA: GET /api/v1/identidad/usuarios
// Protegida: Requiere token (verificarToken) y Rol 1 (Administrador)
router.get('/',
    authMiddleware.verificarToken, 
    authMiddleware.autorizarRol([1]), // Solo Administradores (Rol 1)
    usuariosController.obtenerTodos
);

// ... (export default router)