const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validaJWT = (req, res, next) => {
  //Leer token
  const token = req.header('x-token');
  //console.log(token);

  if (!token) {
    return res.status(401).send({
      ok: false,
      msg: 'No existe token!!!'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido!!!'
    });
  }

}

const validaADMIN_ROL = async (req,res,next) => {
  const uid = req.uid;
  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({ ok: false, msg: 'No usuario existe!!!' });
    }

    if (usuarioDB.role !== 'ADMIN_ROL') {
      return res.status(403).json({ ok: false, msg: 'Usuario no tiene privilegios para realizar la acción!!!' });
    }

    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({ok: false, msg: 'Hable con el Administrador!!!'});
  }

}
const validaADMIN_ROL_o_YOUSELF = async (req,res,next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({ ok: false, msg: 'No usuario existe!!!' });
    }

    if (usuarioDB.role === 'ADMIN_ROL' || uid === id) {
      next();
    }else{
      return res.status(403).json({ ok: false, msg: 'Usuario no tiene privilegios para modificar!!!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ok: false, msg: 'Hable con el Administrador!!!'});
  }

}

module.exports = {
  validaJWT,
  validaADMIN_ROL,
  validaADMIN_ROL_o_YOUSELF
}