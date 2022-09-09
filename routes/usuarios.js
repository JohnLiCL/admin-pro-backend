/*
  Ruta: /api/usuarios
*/
const { Router } = require('express');
const { getUsuarios, crearUsuario,updateUsuario, deleteUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');

const { validaCampos } = require('../middlewares/valida-campos');
const { validaJWT } = require('../middlewares/valida-jwt');

const router = Router();

router.get('/',validaJWT, getUsuarios);

router.post('/',
  [
    check('nombre', 'El nombre es obligarorio!!!').not().isEmpty(),
    check('password', 'La contraseña es obligaroria!!!').not().isEmpty(),
    check('email', 'El email es obligarorio!!!').isEmail(),
    validaCampos,
  ], crearUsuario);


router.put('/:id',
  [
    validaJWT,
    check('nombre', 'El nombre es obligarorio!!!').not().isEmpty(),
    check('password', 'La contraseña es obligaroria!!!').not().isEmpty(),
    check('role', 'El rol es obligarorio!!!').isEmpty(),
    validaCampos,
  ], updateUsuario);

  router.delete('/:id', validaJWT,  deleteUsuario);

module.exports = router;