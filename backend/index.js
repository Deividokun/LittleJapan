const express = require('express')
const cors = require('cors')
const app = express()

// Rutas
const userRoutes = require('./routes/userRoutes')
const accommodationRoutes = require('./routes/accommodationroutes')
const serviceRoutes = require('./routes/serviceroutes')
const reserveRoute = require('./routes/reserveController')
const favouriteRoute = require('./routes/favouriteroutes')

// Conexión a base de datos
const { connectToDatabase } = require('./config/db')

// Puerto del servidor
const PORT = process.env.PORT || 3003

// ⚠️ Lista de orígenes permitidos (comentado temporalmente para pruebas desde móvil)
const allowedOrigins = [
  'http://localhost:5173',
  'https://little-japan-knih.vercel.app'
]

// ✅ Configuración de CORS temporal (acepta todo para pruebas móviles y CORS)
const corsOptions = {
  origin: true, // ⛔️ En producción reemplaza con función dinámica basada en allowedOrigins
  credentials: true,
  optionsSuccessStatus: 200
}

// Iniciar conexión y servidor
connectToDatabase()
  .then(() => {
    app.use(cors(corsOptions))
    app.use(express.json())

    // Rutas
    app.use('/api', userRoutes)
    app.use('/api', accommodationRoutes)
    app.use('/api', serviceRoutes)
    app.use('/api', reserveRoute)
    app.use('/api', favouriteRoute)

    // ✅ Corrección aquí (era 'aapp')
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error)
    process.exit(1)
  })
