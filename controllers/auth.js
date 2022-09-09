const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {

    // Verificar Email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).send({
        ok: false,
        message: 'Email no encontrado!!!'
      });
    }

    // Verificar Password
    const validaPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validaPassword) {
      return res.status(400).send({
        ok: false,
        message: 'Contraseña no valida!!!'
      });
    }

    // Generar TOKEN - JWT
    const token = await generaJWT(usuarioDB.id);


    res.json({
      ok: true,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Login - Hable con el Administrador',
    });

  }

}

module.exports = {
  login,
}