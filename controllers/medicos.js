const { response } = require('express');
const Hospital = require('../models/hospital');
const Medico = require('../models/medicos');

const getMedicos = async(req, res = response, next) => {
  const medicos = await Medico.find()
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
  const medico = new Medico({
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

const updateMedico = async (req, res = response) => {
  const mid = req.params.id;
  const uid = req.params.uid;
    
  try {
    const medico = await Medico.findById(mid);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: 'Medico no encontrado!!!'
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid
    }

    const medicoActualizado = await Medico.findByIdAndUpdate(mid, cambiosMedico, { new: true });

    res.json({
      ok: true,
      medico: medicoActualizado
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el Administrador!!!'
    });
  }
 
}

const deleteMedico = async (req, res = response) => {
  const mid = req.params.id;

  try {
    const medico = await Medico.findById(mid);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: 'Medico no encontrado!!!'
      });
    }

    await Medico.findByIdAndDelete(mid);

    res.json({
      ok: true,
      msg: 'Medico eliminado!!!'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el Administrador!!!'
    });

  }
}

module.exports = {
  getMedicos,
  crearMedico,
  updateMedico,
  deleteMedico
}