import jwt from 'jsonwebtoken';

// Middleware para verificar el token en cada petición protegida
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó token.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido o expirado.' });
    }
    // Adjuntamos el payload del token (que contiene id, area, cargo) al objeto `req`
    req.usuario = usuario;
    next();
  });
};

// Middleware para verificar si el usuario es administrador
export const esAdmin = (req, res, next) => {
  // Este middleware debe ejecutarse DESPUÉS de `verificarToken`
  if (req.usuario && req.usuario.area === 'admin') {
    next();
  } else {
    res.status(403).json({ mensaje: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
};