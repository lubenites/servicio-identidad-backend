// src/models/usuario.model.js (CORREGIDO a ES Modules)

import pool from '../config/database.js'; // Importación por defecto
import { v4 as uuidv4 } from 'uuid'; // Importación con nombre desde librería

/**
 * Inserta un nuevo usuario en la base de datos.
 * ... (Código de la función crearUsuario) ...
 */
async function crearUsuario(nombreCompleto, email, passwordHash, idRol) {
    const idUsuario = uuidv4();
    const query = `
        INSERT INTO usuarios 
        (id_usuario, nombre_completo, email, password_hash, id_rol) 
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [idUsuario, nombreCompleto, email, passwordHash, idRol];

    try {
        await pool.query(query, values);
        return { 
            id_usuario: idUsuario, 
            nombre_completo: nombreCompleto, 
            email: email,
            id_rol: idRol
        };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            const err = new Error('El correo electrónico ya está registrado.');
            err.status = 409; 
            throw err;
        }
        throw error; 
    }
}

/**
 * Busca un usuario por su email para el proceso de Login.
 * ... (Código de la función buscarPorEmail) ...
 */
async function buscarPorEmail(email) {
    const query = 'SELECT id_usuario, password_hash, id_rol, nombre_completo, activo FROM usuarios WHERE email = ?';
    
    try {
        const [rows] = await pool.query(query, [email]);
        return rows.length > 0 ? rows[0] : null;

    } catch (error) {
        console.error("Error al buscar usuario por email en DB:", error);
        throw new Error('Error de base de datos.');
    }
}

/**
 * Obtiene la lista de todos los usuarios (solo datos públicos).
 * @returns {Array} Lista de objetos de usuario.
 */
async function obtenerTodos() {
    // IMPORTANTE: Excluimos el password_hash de la selección
    const query = `
        SELECT id_usuario, nombre_completo, email, id_rol, activo, fecha_creacion 
        FROM usuarios
    `;
    
    try {
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error("Error al obtener todos los usuarios en DB:", error);
        throw new Error('Error de base de datos al listar usuarios.');
    }
}

// Exportación con nombre
export {
    crearUsuario,
    buscarPorEmail,
    obtenerTodos, // <--- ¡Añadido!
};