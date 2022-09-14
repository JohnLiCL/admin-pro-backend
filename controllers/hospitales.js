const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response, next) => {
  const hospitales = await Hospital.find()
    .populate('usuario', 'nombre img');
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

    const hospitalDB = await hospital.save();

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

const updateHospital = async (req, res = response) => {

  const hid = req.params.id;
  const uid = req.params.uid;
  try {
    const hospital = await Hospital.findById(hid);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: 'Hospital no encontrado!!!'
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid
    }

    const hopitalActualizado = await Hospital.findByIdAndUpdate(hid, cambiosHospital, { new: true });

    res.json({
      ok: true,
      hospital: hopitalActualizado
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el Administrador!!!'
    });
  }
}

const deleteHospital = async (req, res = response) => {
  const hid = req.params.id;

  try {
    const hospital = await Hospital.findById(hid);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: 'Hospital no encontrado!!!'
      });
    }

    await Hospital.findByIdAndDelete(hid);

    res.json({
      ok: true,
      msg: 'Hospital eliminado!!!'
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
  getHospitales,
  crearHospital,
  updateHospital,
  deleteHospital
}