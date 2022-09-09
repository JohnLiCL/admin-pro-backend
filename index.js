require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el Servidor Express
const app = express();

//configurar Cors
app.use(cors());

// Lectura y parseo del Body
app.use(express.json());

//Base de Datos
dbConnection();

// mean_user
// SbqmIxy8RNiWtYjk

//Rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/login',require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log('Servicor Corriendo en el puerto: ', process.env.PORT);
});

