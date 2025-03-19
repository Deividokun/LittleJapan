const express = require('express') //Se importa Express, un framework para crear servidores en Node.js.
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/userRoutes')
const accommodationRoutes = require('./routes/accommodationroutes')
const serviceRoutes = require('./routes/serviceroutes')
const reserveRoute = require('./routes/reserveController')
const favouriteRoute = require('./routes/favouriteroutes')
const { connectToDatabase } = require('./config/db')

const PORT = 3000

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Asume que tu frontend está corriendo en el puerto 5173
  optionsSuccessStatus: 200
}

// Conectar a la base de datos antes de iniciar el servidor
connectToDatabase()
  .then(() => {
    // Middleware
    app.use(cors(corsOptions)) /// <--- Aquí se configura CORS para permitir solicitudes desde el puerto 5173
    app.use(express.json())

    // Rutas
    app.use('/api', userRoutes)
    app.use('/api', accommodationRoutes)
    app.use('/api', serviceRoutes)
    app.use('/api', reserveRoute)
    app.use('/api', favouriteRoute)

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error)
    process.exit(1)
  })
