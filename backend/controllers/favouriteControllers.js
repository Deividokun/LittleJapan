const { sql } = require('../config/db')


async function getFavorites(req, res) {
  const { userId } = req.params

  try {
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('userId', sql.UniqueIdentifier, userId).query(`
        SELECT A.[id], A.[type], A.[ownerid], A.[guests], A.[city], 
               A.[pricepernight], A.[image], A.[name], A.[description]
        FROM [LITTLEJAPAN2].[dbo].[Favourite] F
        JOIN [LITTLEJAPAN2].[dbo].[Accommodation] A 
            ON F.[accommodationsid] = A.[id]
        WHERE F.[usersid] = @userId;
      `)

    res.json(result.recordset)
  } catch (error) {
    console.error('Error al obtener alojamientos favoritos:', error)
    res.status(500).send('Error al obtener alojamientos favoritos')
  }
}

async function getFavoriteById(req, res) {
  const { id: userId } = req.params 

  console.log('Parámetros recibidos:', req.params) 

  if (!userId) {
    return res.status(400).json({ message: 'Falta el userId en la solicitud' })
  }

  try {
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('userId', sql.UniqueIdentifier, userId) 
      .query(`
        SELECT A.*
        FROM [LITTLEJAPAN2].[dbo].[Favourite] F
        LEFT JOIN [LITTLEJAPAN2].[dbo].[Accommodation] A 
            ON F.[accommodationsid] = A.[id]
        WHERE F.[usersid] = @userId;
      `)

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron alojamientos favoritos para este usuario'
      })
    }

    res.json(result.recordset)
  } catch (error) {
    console.error('Error al obtener los alojamientos favoritos:', error)
    res.status(500).send('Error al obtener los alojamientos favoritos')
  }
}

async function addFavorite(req, res) {
  const { userId, accommodationId } = req.body

  if (!userId || !accommodationId) {
    return res.status(400).json({ message: 'Faltan datos requeridos' })
  }

  try {
    const pool = await sql.connect()
    await pool
      .request()
      .input('userId', sql.UniqueIdentifier, userId)
      .input('accommodationId', sql.UniqueIdentifier, accommodationId).query(`
        INSERT INTO [LITTLEJAPAN2].[dbo].[Favourite] (usersid, accommodationsid)
        VALUES (@userId, @accommodationId);
      `)

    res.status(201).json({ message: 'Alojamiento añadido a favoritos' })
  } catch (error) {
    console.error('Error al agregar alojamiento a favoritos:', error)
    res.status(500).send('Error al agregar alojamiento a favoritos')
  }
}


async function deleteFavorite(req, res) {
  const { favId } = req.params

  try {
    const pool = await sql.connect()
    const result = await pool
      .request()
      .input('favId', sql.UniqueIdentifier, favId).query(`
        DELETE FROM [LITTLEJAPAN2].[dbo].[Favourite]
        WHERE accommodationsid = @favId;
      `)

    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: 'Alojamiento favorito no encontrado' })
    }

    res.json({ message: 'Alojamiento eliminado de favoritos' })
  } catch (error) {
    console.error('Error al eliminar alojamiento favorito:', error)
    res.status(500).send('Error al eliminar alojamiento favorito')
  }
}

module.exports = { getFavorites, getFavoriteById, addFavorite, deleteFavorite }
