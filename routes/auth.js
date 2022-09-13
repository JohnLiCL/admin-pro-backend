/**
  Path: '/api/login'
 */
const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
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
router.post('/google',
  [
    check('token', 'El Token de Google es obligarorio!!!').not().isEmpty(),
    validaCampos
  ],
  googleSignIn
);

module.exports = router;