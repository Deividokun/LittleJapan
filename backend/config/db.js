require('dotenv').config()
const sql = require('mssql')

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true'
  }
}

async function connectToDatabase() {
  try {
    await sql.connect(config)
    console.log('Conexión exitosa a la base de datos')
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err)
  }
}

module.exports = { sql, connectToDatabase }
