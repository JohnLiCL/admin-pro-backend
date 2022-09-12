/*
  Ruta: /api/busqueda
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getBusquedaTotal, getBusquedaTabla } = require('../controllers/busquedas');


const { validaCampos } = require('../middlewares/valida-campos');
const { validaJWT } = require('../middlewares/valida-jwt');

const router = Router();

router.get('/:buscar',  validaJWT, getBusquedaTotal);
router.get('/coleccion/:tabla/:buscar',  validaJWT, getBusquedaTabla);

// router.post('/',
//   [
//     validaJWT,
//     check('nombre', 'El nombre del hospital es obligarorio!!!').not().isEmpty(),
//     validaCampos
//   ], crearHospital);

// router.put('/:id',
//   [

//   ], updateHospital);

// router.delete('/:id', validaJWT,  deleteHospital);

module.exports = router;