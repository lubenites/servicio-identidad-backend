// src/controllers/usuarios.controller.js (COMPLETO Y CORREGIDO)

// Importamos el Modelo (asegúrate de que exista y use 'export' con nombre)
import * as usuarioModel from '../models/usuario.model.js'; 

/**
 * Función de ejemplo que solo debe ser accesible para administradores (Rol 1).
 */
function crearUsuarioAdmin(req, res) {
    // Si llegas aquí, significa que el token es válido Y el rol es 1.
    return res.status(200).json({
        message: '✅ ACCESO CONCEDIDO. Eres Administrador (Rol ' + req.usuario.rol + '). La lógica de creación se ejecutaría aquí.',
        usuario: req.usuario
    });
}

/**
 * Ejemplo de un endpoint protegido. Muestra el perfil del usuario autenticado.
 */
function obtenerPerfil(req, res) {
    const { id, nombre, email, rol } = req.usuario; 

    return res.status(200).json({
        message: 'Acceso a perfil exitoso (Ruta protegida).',
        perfil: {
            id_usuario: id,
            nombre_completo: nombre,
            email: email,
            id_rol: rol,
        }
    });
}

/**
 * Controlador para obtener la lista completa de usuarios (protegida por rol).
 */
async function obtenerTodos(req, res) {
    try {
        const usuarios = await usuarioModel.obtenerTodos();
        
        return res.status(200).json({
            message: 'Lista de usuarios recuperada exitosamente.',
            total: usuarios.length,
            data: usuarios
        });

    } catch (error) {
        return res.status(500).json({ 
            message: error.message || 'Error interno del servidor.' 
        });
    }
}

// ✅ Exportamos todas las funciones (deben estar definidas antes de este bloque)
export {
    obtenerPerfil,
    crearUsuarioAdmin, // ¡Ahora está definida!
    obtenerTodos, 
};