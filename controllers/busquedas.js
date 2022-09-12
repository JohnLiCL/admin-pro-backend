
const { response } = require('express');
const Usuario = require('../models/usuario');
const Medicos = require('../models/medicos');
const Hospital = require('../models/hospital');


const getBusquedaTotal = async (req, res = require, next) => {

  const buscar = req.params.buscar;
  const regex = new RegExp(buscar, 'i');
  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medicos.find({ nombre: regex }),
    Hospital.find({ nombre: regex })
  ]);

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
    buscar
  });
  next();
}


const getBusquedaTabla = async (req, res = require, next) => {

  const tabla = req.params.tabla;
  const buscar = req.params.buscar;
  const regex = new RegExp(buscar, 'i');
  let data = [];

  switch (tabla) {
    case 'usuarios':
      data = await Usuario.find({ nombre: regex });
      break;
    case 'medicos':
      data = await Medicos.find({ nombre: regex })
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');
      break;
    case 'hospitales':
      data = await Hospital.find({ nombre: regex })
        .populate('usuario', 'nombre img');
      break;

    default:
      return res.status(500).json({
        ok: false,
        msg: 'Tabla debe ser usuarios - medicos - hospitales!!!'
      });
  }

  res.json({
    ok: true,
    data,
    buscar
  });
  next();
}

module.exports = {
  getBusquedaTotal,
  getBusquedaTabla
}