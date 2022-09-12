const { response } = require('express');
const hospital = require('../models/hospital');
const Medicos = require('../models/medicos');

const getMedicos = async(req, res = response, next) => {
  const medicos = await Medicos.find()
                                .populate('hospital', 'nombre')
                                .populate('usuario', 'nombre');
  res.json({
    ok: true,
    medicos: medicos
  });
  next();
}

const crearMedico = async (req, res = response, next) => {
  const uid = req.uid;
  const hid = req.body.hospital;
  const medico = new Medicos({
    usuario: uid,
    hospital: hid,
    ...req.body
  });

   try {

    const medicoDB = await medico.save();
      res.json({
        ok: true,
        medico: medicoDB
      });
      next();  
   } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Comuniquese con el Admin!!!'
      });
   }
}

const updateMedico = (req, res = response, next) => {
  res.json({
    ok: true,
    msg: 'updateMedico'
  });
  next();
}
const deleteMedico = (req, res = response, next) => {
  res.json({
    ok: true,
    msg: 'deleteMedico'
  });
  next();
}

module.exports = {
  getMedicos,
  crearMedico,
  updateMedico,
  deleteMedico
}