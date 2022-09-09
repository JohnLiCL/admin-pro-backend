/**
  Path: '/api/login'
 */
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validaCampos } = require('../middlewares/valida-campos');



const router = Router();

router.post('/',
  [
    check('email', 'El nombre es obligarorio!!!').isEmail(),
    check('password', 'El Password es obligarorio!!!').not().isEmpty(),
    validaCampos
  ],
  login
);

module.exports = router;