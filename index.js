require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el Servidor Express
const app = express();

//configurar Cors
app.use(cors());

//Carpeta Publica
app.use(express.static('public'));

// Lectura y parseo del Body
app.use(express.json());

//Base de Datos
dbConnection();

//Rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/busqueda',require('./routes/busquedas'));
app.use('/api/upload',require('./routes/uploads'));

app.listen(process.env.PORT, () => {
  console.log('Servicor Corriendo en el puerto: ', process.env.PORT);
});

