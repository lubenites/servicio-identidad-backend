// src/controllers/auth.controller.js
import { identityService } from '../services/identity.service.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y contraseña son requeridos.' });
    }
    const { token, usuario } = await identityService.autenticarUsuario(email, password);
    res.status(200).json({ token, usuario });
  } catch (error) {
    res.status(401).json({ mensaje: error.message || 'Credenciales inválidas.' });
  }
};
