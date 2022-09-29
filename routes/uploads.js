/*
  Ruta: /api/upload
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, getImage } = require('../controllers/uploads');

const { validaJWT } = require('../middlewares/valida-jwt');

const router = Router();
router.use(expressFileUpload());

router.put('/:tipo/:id',  validaJWT, fileUpload);
router.get('/:tipo/:image',  getImage);

module.exports = router;