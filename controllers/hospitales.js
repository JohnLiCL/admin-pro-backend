const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response, next) => {
  const hospitales = await Hospital.find()
                                    .populate('usuario','nombre img');
  res.json({
    ok: true,
    hospitales
  });
  next();
}

const crearHospital = async (req, res = response, next) => {
  const uid = req.uid;
  const hospital = new Hospital(
    {
      usuario: uid,
      ...req.body
    });
        

  try {

    const hospitalDB =  await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB
    });
    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el Administrador!!!'
    });
    next();
  }

}

const updateHospital = (req, res = response, next) => {
  res.json({
    ok: true,
    msg: 'updateHospital'
  });
  next();
}
const deleteHospital = (req, res = response, next) => {
  res.json({
    ok: true,
    msg: 'deleteHospital'
  });
  next();
}

module.exports = {
  getHospitales,
  crearHospital,
  updateHospital,
  deleteHospital
}