const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, 'nombre email role google');
  res.json({
    ok: true,
    usuarios,
    uid: req.uid,
  });
};

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya esta registrado!!!'
      })
    }

    const usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Grabar Usuario
    await usuario.save();

    // Generar TOKEN - JWT
    const token = await generaJWT(usuario.id)

    res.json({
      ok: true,
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: 'Error Inesperado... revisar Log!!!'
    });
  }
};

const updateUsuario = async (req, res = response) => {
  // ToDo: validar token y comprobar si el usuario es correcto

  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No esxite un usuario con el ID!!!'
      });

    }

    //Actualizar el usuario
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email != email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con el email!!!'
        });
      }
    }

    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: 'Error Inesperado... revisar Log!!!'
    });

  }
};

const deleteUsuario = async (req, res = response) => {

  const uid = req.params.id;
  try {

    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No esxite un usuario con el ID!!!'
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg:'Usuario eliminado con exito!!!'
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: 'Hable con el Administrador!!!'
    });
  }
};


module.exports = {
  getUsuarios,
  crearUsuario,
  updateUsuario,
  deleteUsuario,
}