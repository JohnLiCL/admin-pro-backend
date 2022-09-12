const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: 'Tipo inválido!!!'
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No se envio ningun Archivo!!!!'
    });
  }

  //Procesar la Imagen
  const file = req.files.imagen;

  const nombreCortado = file.name.split('.');
  const extension = nombreCortado[nombreCortado.length - 1];

  //Validar Extension
  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

  if (!extensionesValidas.includes(extension)) {
    return res.status(400).json({
      ok: false,
      msg: 'No un Archivo con extension permitida!!!!'
    });
  }

  const nombreArchivo = `${uuidv4()}.${extension}`;

  //Path para guardar la imagen
  const pathImagen = `./uploads/${tipo}/${nombreArchivo}`;

  // Use the mv() method to place the file somewhere on your server
  file.mv(pathImagen, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'No se subio ningun Archivo!!!'
      });

    }

    // Actualizar la BD
    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      nombreArchivo,
      pathImagen
    });
  });


}

const getImage = (req, res = response) => {
  const tipo = req.params.tipo;
  const image = req.params.image;

  let pathImagen = path.join(__dirname, `../uploads/${ tipo }/${ image }` );
  if (!fs.existsSync(pathImagen)) {
    pathImagen = path.join(__dirname, `../uploads/no-img.jpg` );
  }  
  res.sendFile(pathImagen);
}

module.exports = {
  fileUpload,
  getImage
}
