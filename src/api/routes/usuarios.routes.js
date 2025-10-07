import { Router } from 'express';
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../../controllers/usuarios.controller.js';
import { verificarToken, esAdmin } from '../../middleware/auth.middleware.js';

const router = Router();

// 🔓 Ruta pública: crear usuario (NO necesita token ni admin)
router.post('/', crearUsuario);

// 🔒 Rutas protegidas: requieren token + admin
router.use(verificarToken, esAdmin); // 👈 Solo aplica a partir de aquí

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;