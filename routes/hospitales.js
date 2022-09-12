/*
  Ruta: /api/hospitales/
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospital, updateHospital, deleteHospital } = require('../controllers/hospitales');

const { validaCampos } = require('../middlewares/valida-campos');
const { validaJWT } = require('../middlewares/valida-jwt');

const router = Router();

router.get('/',validaJWT, getHospitales);

router.post('/',
  [
    validaJWT,
    check('nombre', 'El nombre del hospital es obligarorio!!!').not().isEmpty(),
    validaCampos
  ], crearHospital);

router.put('/:id',
  [
    
  ], updateHospital);

router.delete('/:id', validaJWT,  deleteHospital);

module.exports = router;