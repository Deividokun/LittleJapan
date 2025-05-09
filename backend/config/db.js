require('dotenv').config();
const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true'
  }
};

async function connectToDatabase() {
  try {
    console.log('Intentando conectar con:', {
      server: config.server,
      database: config.database,
      user: config.user,
      port: config.port
    });
    await sql.connect(config);
    console.log('✅ Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = { connectToDatabase, sql };
