const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { sql, connectToDatabase } = require('../config/db')
const User = require('../models/User')


async function getUsers(req, res) {
  try {
    const pool = await sql.connect()
    const result = await pool
      .request()
      .query(
        'SELECT TOP (1000) [id], [name], [experience], [password], [rating], [image], [document_number], [telephone_number], [age], [Email], [FullName] FROM [LITTLEJAPAN2].[dbo].[Users]'
      )


    const users = result.recordset.map((user) =>
      Object.assign(new User(user), user)
    )

    console.log(users) 

    res.json(users)
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).send('Error al obtener usuarios')
  }
}


async function getUserById(req, res) {
  const { id } = req.params
  try {
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id)
      .query(
        'SELECT [id], [name], [experience], [password], [rating], [image], [document_number], [telephone_number], [age], [Email], [FullName] FROM [LITTLEJAPAN2].[dbo].[Users] WHERE id = @id'
      )
    if (result.recordset.length === 0) {
      return res.status(404).send('Usuario no encontrado')
    }
    const user = new User(result.recordset[0]) 
    res.json(user) 
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    res.status(500).send('Error al obtener usuario')
  }
}
async function loginUser(req, res) {
  console.log('Datos recibidos:', req.body)
  const { nombreUsuario, contrasena } = req.body

  try {
    await connectToDatabase()

    const result = await sql.query`
      SELECT [id], [name], [password] 
      FROM [LITTLEJAPAN2].[dbo].[Users] 
      WHERE name = ${nombreUsuario}
    `

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const user = result.recordset[0]
    console.log('Usuario encontrado:', user)

    const isMatch = await bcrypt.compare(contrasena, user.password)

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      'tu_clave_secreta',
      { expiresIn: '1h' }
    )

  
    res.json({ token, userId: user.id })
  } catch (error) {
    console.error('Error en el login:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
async function createUser(req, res) {
  const {
    name,
    experience,
    password,
    image,
    document_number,
    telephone_number,
    age,
    Email,
    fullName
  } = req.body

  try {
    const pool = await sql.connect()

    const existingUser = await pool
      .request()
      .input('document_number', sql.NVarChar, document_number)
      .query(
        'SELECT * FROM [LITTLEJAPAN2].[dbo].[Users] WHERE document_number = @document_number'
      )

    if (existingUser.recordset.length > 0) {
      return res
        .status(400)
        .json({ message: 'El número de documento ya está registrado' })
    }

 
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)


    const result = await pool
      .request()
      .input('name', sql.NVarChar, name)
      .input('experience', sql.Int, experience)
      .input('password', sql.NVarChar, hashedPassword) 
      .input('image', sql.NVarChar, image)
      .input('document_number', sql.NVarChar, document_number)
      .input('telephone_number', sql.NVarChar, telephone_number)
      .input('age', sql.Int, age)
      .input('Email', sql.NVarChar, Email)
      .input('fullName', sql.NVarChar, fullName)
      .query(
        'INSERT INTO [LITTLEJAPAN2].[dbo].[Users] ([name], [experience], [password], [image], [document_number], [telephone_number], [age], [Email], [FullName]) VALUES (@name, @experience, @password, @image, @document_number, @telephone_number, @age, @Email, @fullName)'
      )

    if (result.rowsAffected[0] > 0) {
      return res.status(201).json({
        message: 'Usuario creado exitosamente',
        user: {
          name,
          experience,
          image,
          document_number,
          telephone_number,
          age,
          Email,
          fullName
        }
      })
    } else {
      return res.status(400).json({ message: 'No se pudo crear el usuario' })
    }
  } catch (error) {
    console.error('Error al crear usuario:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

async function updateUser(req, res) {
  const { id } = req.params
  const {
    name,
    experience,
    password,
    image,
    document_number,
    telephone_number,
    age,
    email,
    fullName
  } = req.body
  try {
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id)
      .input('name', sql.NVarChar, name)
      .input('experience', sql.Int, experience)
      .input('password', sql.NVarChar, password) 
      .input('rating', sql.Float, rating)
      .input('image', sql.NVarChar, image)
      .input('document_number', sql.NVarChar, document_number)
      .input('telephone_number', sql.NVarChar, telephone_number)
      .input('age', sql.Int, age)
      .input('email', sql.NVarChar, email)
      .input('fullName', sql.NVarChar, fullName)
      .query(
        'UPDATE [LITTLEJAPAN2].[dbo].[Users] SET [name] = @name, [experience] = @experience, [password] = @password, [rating] = @rating, [image] = @image, [document_number] = @document_number, [telephone_number] = @telephone_number, [age] = @age, [Email] = @email, [FullName] = @fullName WHERE id = @id'
      )
    if (result.rowsAffected[0] === 0) {
      return res.status(404).send('Usuario no encontrado')
    }

    const updatedUser = new User({
      id,
      name,
      experience,
      password,
      rating,
      image,
      document_number,
      telephone_number,
      age,
      email,
      fullName
    })

    res.json(updatedUser) 
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    res.status(500).send('Error al actualizar usuario')
  }
}

async function deleteUser(req, res) {
  const { id } = req.params
  try {
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('id', sql.UniqueIdentifier, id)
      .query('DELETE FROM [LITTLEJAPAN2].[dbo].[Users] WHERE id = @id')
    if (result.rowsAffected[0] === 0) {
      return res.status(404).send('Usuario no encontrado')
    }
    res.send('Usuario eliminado exitosamente')
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    res.status(500).send('Error al eliminar usuario')
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
}
