const bcrypt = require('bcryptjs')
const { sql, connectToDatabase } = require('../config/db') // Asegúrate de que la ruta sea correcta

async function rehashPasswords() {
  try {
    // Conectar a la base de datos
    await connectToDatabase()

    // Realizar la consulta para obtener las contraseñas
    const result = await sql.query('SELECT id, password FROM Users')

    for (const user of result.recordset) {
      if (user.password.length < 60) {
        // Asume que los hashes tienen al menos 60 caracteres
        const hashedPassword = await bcrypt.hash(user.password, 10)
        await sql.query`UPDATE Users SET password = ${hashedPassword} WHERE id = ${user.id}`
      }
    } //e recorre cada usuario obtenido en result.recordset.
    // Se verifica si la contraseña tiene menos de 60 caracteres.
    // ¿Por qué 60?
    // Los hashes generados por bcrypt en su formato estándar siempre tienen 60 caracteres o más.
    // Si la longitud de la contraseña es menor, se asume que no está hasheada y debe ser protegida.
    console.log('Contraseñas rehasheadas correctamente.')
  } catch (error) {
    console.error('Error al rehashear las contraseñas:', error)
  } finally {
    // Cerrar la conexión a la base de datos
    await sql.close()
  }
}

rehashPasswords()
