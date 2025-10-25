// src/controllers/auth.controller.js (CORREGIDO a ES Modules)

// Importamos todas las exportaciones con nombre del servicio
import * as identityService from '../services/identity.service.js'; 

/**
 * Controlador para el Registro de Usuarios.
 * ... (Código de la función registrarUsuario) ...
 */
async function registrarUsuario(req, res) {
    const { nombreCompleto, email, password } = req.body;

    if (!nombreCompleto || !email || !password) {
        return res.status(400).json({ 
            message: 'Faltan campos obligatorios (nombreCompleto, email, password).' 
        });
    }

    try {
        const nuevoUsuario = await identityService.registrarUsuarioService(req.body);

        return res.status(201).json({
            message: 'Usuario registrado exitosamente.',
            usuario: nuevoUsuario
        });

    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ 
            message: error.message || 'Error interno del servidor al registrar.' 
        });
    }
}


/**
 * Controlador para el Inicio de Sesión (Login).
 * ... (Código de la función iniciarSesion) ...
 */
async function iniciarSesion(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            message: 'Debe proporcionar email y password.' 
        });
    }

    try {
        const resultado = await identityService.loginService(email, password);

        return res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            token: resultado.token,
            usuario: resultado.usuario
        });

    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ 
            message: error.message || 'Error interno del servidor al iniciar sesión.' 
        });
    }
}

// Exportación con nombre
export {
    registrarUsuario,
    iniciarSesion,
};