// src/middleware/auth.middleware.js (CORREGIDO a ES Modules)

import jwt from 'jsonwebtoken'; // Importar librería

// Debe ser la misma clave secreta que usas para firmar los tokens en el servicio
const JWT_SECRET = process.env.JWT_SECRET; 

/**
 * Middleware para verificar la validez del JSON Web Token (JWT).
 */
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            message: 'Acceso denegado. No se proporcionó token o el formato es incorrecto.' 
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            message: 'Acceso denegado. Token faltante.' 
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded;
        next();

    } catch (error) {
        console.error("Error al verificar token:", error.message);
        return res.status(401).json({ 
            message: 'Token inválido o expirado. Vuelva a iniciar sesión.' 
        });
    }
}

// Exportación con nombre
export { verificarToken, autorizarRol }; // Exportación con nombre