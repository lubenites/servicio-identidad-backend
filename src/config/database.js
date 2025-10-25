// src/config/database.js (CORREGIDO a ES Modules)

import mysql from 'mysql2/promise'; 

// Crear el 'pool' de conexión
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para probar la conexión
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Conexión exitosa a la base de datos MySQL.");
        connection.release();
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error.message);
        process.exit(1); 
    }
}

testConnection();

// Exportamos el pool para usarlo en los modelos (exportación por defecto)
export default pool;