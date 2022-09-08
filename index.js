require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el Servidor Express
const app = express();

//configurar Cors
app.use(cors());

//Base de Datos
dbConnection();

// mean_user
// SbqmIxy8RNiWtYjk
//console.log(process.env);




//Rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hola Mundo'
  });
});

app.listen(process.env.PORT, () => {
  console.log('Servicor Corriendo en el puerto: ', process.env.PORT);
});

