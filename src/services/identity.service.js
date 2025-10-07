// src/services/identity.service.js
import * as UsuarioModel from '../models/usuario.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

// --- AUTENTICACIÓN ---
const autenticarUsuario = async (email, passwordIngresada) => {
  const usuario = await UsuarioModel.findByEmail(email);
  if (!usuario) throw new Error('Credenciales inválidas.');

  const esPasswordCorrecto = await bcrypt.compare(passwordIngresada, usuario.password_hash);
  if (!esPasswordCorrecto) throw new Error('Credenciales inválidas.');

  const payload = { id: usuario.id, area: usuario.area, cargo: usuario.cargo };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

  // No devolver el hash
  delete usuario.password_hash;
  return { token, usuario };
};

// --- GESTIÓN DE USUARIOS (CRUD) ---
const obtenerTodosLosUsuarios = async () => {
  return await UsuarioModel.findAll();
};

const obtenerUsuarioPorId = async (id) => {
  return await UsuarioModel.findById(id);
};

const crearNuevoUsuario = async (datosUsuario) => {
  const { password, ...restoDatos } = datosUsuario;
  if (!password) throw new Error('La contraseña es requerida para crear un usuario.');

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  return await UsuarioModel.create({ ...restoDatos, password_hash: passwordHash });
};

const actualizarDatosUsuario = async (id, datosUsuario) => {
  const { password, ...restoDatos } = datosUsuario;
  const datosParaActualizar = { ...restoDatos };

  // Si se proporciona nueva contraseña, la hasheamos
  if (password) {
    datosParaActualizar.password_hash = await bcrypt.hash(password, SALT_ROUNDS);
  }

  const result = await UsuarioModel.update(id, datosParaActualizar);
  if (result.affectedRows === 0) return null;

  return await UsuarioModel.findById(id);
};

const eliminarUsuarioPorId = async (id) => {
  const result = await UsuarioModel.remove(id);
  return result.affectedRows > 0;
};

// Exporta un objeto nombrado tal como lo espera tu controlador
export const identityService = {
  autenticarUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  crearNuevoUsuario,
  actualizarDatosUsuario,
  eliminarUsuarioPorId
};
