const bcrypt = require('bcryptjs')
const { sql, connectToDatabase } = require('../config/db') 

async function rehashPasswords() {
  try {
   
    await connectToDatabase()

    
    const result = await sql.query('SELECT id, password FROM Users')

    for (const user of result.recordset) {
      if (user.password.length < 60) {
       
        const hashedPassword = await bcrypt.hash(user.password, 10)
        await sql.query`UPDATE Users SET password = ${hashedPassword} WHERE id = ${user.id}`
      }
    } 
    console.log('Contraseñas rehasheadas correctamente.')
  } catch (error) {
    console.error('Error al rehashear las contraseñas:', error)
  } finally {
    
    await sql.close()
  }
}

rehashPasswords()
