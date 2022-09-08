const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {

  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('DB On Line');
  } catch (error) {
    console.log('****', error);
    throw new Error('Error a la hora de conectar la BD ver Log');
  }
}

module.exports = {
  dbConnection
}