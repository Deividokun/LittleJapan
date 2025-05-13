const express = require('express');
const cors = require('cors');
const app = express();

// Rutas
const userRoutes = require('./routes/userRoutes');
const accommodationRoutes = require('./routes/accommodationroutes');
const serviceRoutes = require('./routes/serviceroutes');
const reserveRoute = require('./routes/reserveController');
const favouriteRoute = require('./routes/favouriteroutes');

// Conexión a base de datos
const { connectToDatabase } = require('./config/db');

// Puerto del servidor
const PORT = process.env.PORT || 3003;

// Lista de orígenes permitidos
const allowedOrigins = [
  'http://localhost:5173',
  'https://little-japan-knih.vercel.app',
  'https://littlejapan.onrender.com' // 👈 FRONTEND EN RENDER
];

// Configuración de CORS dinámica
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como curl o Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Iniciar conexión y servidor
connectToDatabase()
  .then(() => {
    app.use(cors(corsOptions));
    app.use(express.json());

    // Rutas
    app.use('/api', userRoutes);
    app.use('/api', accommodationRoutes);
    app.use('/api', serviceRoutes);
    app.use('/api', reserveRoute);
    app.use('/api', favouriteRoute);

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1);
  });

