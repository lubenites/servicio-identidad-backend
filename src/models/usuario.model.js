import { pool } from '../config/database.js';

// No devolver nunca el password_hash en las consultas SELECT
const CAMPOS_PUBLICOS = 'id, nombres, apellidos, email, area, cargo, fecha_creacion';

export const findAll = async () => {
  const [rows] = await pool.execute(`SELECT ${CAMPOS_PUBLICOS} FROM usuarios`);
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.execute(`SELECT ${CAMPOS_PUBLICOS} FROM usuarios WHERE id = ?`, [id]);
  return rows[0] || null;
};

// Esta función sí necesita el hash para la comparación, por lo que lo devuelve.
export const findByEmail = async (email) => {
  const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0] || null;
};

export const create = async (datosUsuario) => {
  const { nombres, apellidos, email, password_hash, area, cargo } = datosUsuario;
  const [result] = await pool.execute(
    'INSERT INTO usuarios (nombres, apellidos, email, password_hash, area, cargo) VALUES (?, ?, ?, ?, ?, ?)',
    [nombres, apellidos, email, password_hash, area, cargo || null]
  );
  // Devolvemos el usuario recién creado (sin el hash)
  return findById(result.insertId);
};

export const update = async (id, datosUsuario) => {
  // Construye la consulta dinámicamente para actualizar solo los campos proporcionados
  const campos = Object.keys(datosUsuario);
  const valores = Object.values(datosUsuario);

  if (campos.length === 0) {
    return { affectedRows: 0 }; // No hay nada que actualizar
  }

  const setClause = campos.map(campo => `${campo} = ?`).join(', ');
  const sql = `UPDATE usuarios SET ${setClause} WHERE id = ?`;
  
  const [result] = await pool.execute(sql, [...valores, id]);
  return result;
};

export const remove = async (id) => {
 const [result] = await pool.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  return result;
};