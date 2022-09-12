/*
  Ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedico, updateMedico, deleteMedico } = require('../controllers/medicos');

const { validaCampos } = require('../middlewares/valida-campos');
const { validaJWT } = require('../middlewares/valida-jwt');

const router = Router();

router.get('/',validaJWT, getMedicos);

router.post('/',
  [
    validaJWT,
    check('nombre','El nombre del medico es obligatorio!!!').not().isEmpty(),
    check('hospital','El hospital id debe ser valido!!!').not().isEmpty(),
    validaCampos
  ], crearMedico);

router.put('/:id',
  [
    
  ], updateMedico);

router.delete('/:id', validaJWT,  deleteMedico);

module.exports = router;