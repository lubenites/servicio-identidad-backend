import { identityService } from '../services/identity.service.js';

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await identityService.obtenerTodosLosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios.', error: error.message });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuario = await identityService.obtenerUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el usuario.', error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await identityService.crearNuevoUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    // Manejar error de email duplicado
    if (error.code === 'ER_DUP_ENTRY') {
       return res.status(409).json({ mensaje: 'El correo electrónico ya está en uso.' });
    }
    res.status(500).json({ mensaje: 'Error al crear el usuario.', error: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarioActualizado = await identityService.actualizarDatosUsuario(id, req.body);
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
       return res.status(409).json({ mensaje: 'El correo electrónico ya está en uso.' });
    }
    res.status(500).json({ mensaje: 'Error al actualizar el usuario.', error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const exito = await identityService.eliminarUsuarioPorId(id);
    if (!exito) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }
    res.status(204).send(); // 204 No Content: éxito sin devolver datos
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario.', error: error.message });
  }
};