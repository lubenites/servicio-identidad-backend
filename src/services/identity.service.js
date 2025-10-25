// src/services/identity.service.js (CORREGIDO a ES Modules)

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Importamos todas las exportaciones del modelo con un alias (*)
import * as usuarioModel from '../models/usuario.model.js'; 

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10; 

/**
 * Servicio de Registro: Encripta la contraseña y guarda el usuario.
 * ... (Código de la función registrarUsuarioService) ...
 */
async function registrarUsuarioService(data) {
    const { nombreCompleto, email, password, idRol = 3 } = data;

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    
    const nuevoUsuario = await usuarioModel.crearUsuario(
        nombreCompleto, 
        email, 
        passwordHash, 
        idRol
    );

    return {
        id_usuario: nuevoUsuario.id_usuario,
        nombre_completo: nuevoUsuario.nombre_completo,
        email: nuevoUsuario.email,
        id_rol: nuevoUsuario.id_rol
    };
}

/**
 * Servicio de Login: Verifica credenciales y genera JWT.
 * ... (Código de la función loginService) ...
 */
async function loginService(email, password) {
    const usuario = await usuarioModel.buscarPorEmail(email);

    if (!usuario) {
        const error = new Error('Credenciales inválidas.');
        error.status = 401; 
        throw error;
    }

    if (!usuario.activo) {
        const error = new Error('Usuario inactivo. Contacte al administrador.');
        error.status = 403; 
        throw error;
    }

    const isMatch = await bcrypt.compare(password, usuario.password_hash);

    if (!isMatch) {
        const error = new Error('Credenciales inválidas.');
        error.status = 401; 
        throw error;
    }

    const payload = {
        id: usuario.id_usuario,
        rol: usuario.id_rol,
        nombre: usuario.nombre_completo,
        email: usuario.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    return {
        token: token,
        usuario: {
            id_usuario: usuario.id_usuario,
            nombre_completo: usuario.nombre_completo,
            id_rol: usuario.id_rol,
        }
    };
}

// Exportación con nombre
export {
    registrarUsuarioService,
    loginService,
};