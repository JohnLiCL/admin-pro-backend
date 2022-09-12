const fs = require('fs');
const Usuario = require('../models/usuario');
const Medicos = require('../models/medicos');
const Hospital = require('../models/hospital');


const borraImagen = (path) => {
  if (fs.existsSync(path)) {
    //Borra Imagen antigua
    fs.unlinkSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = '';
  switch (tipo) {
    case 'medicos':
      const medico = await Medicos.findById(id);
      if (!medico) {
        console.log('No es un medico!!!');
        return false;
      }

      pathViejo = `./uploads/medicos/${medico.img}/`;
      borraImagen(pathViejo);

      medico.img = nombreArchivo;
      await medico.save();
      return true;
      break;
    case 'hospitales':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log('No es un hospital!!!');
        return false;
      }

      pathViejo = `./uploads/hospitales/${hospital.img}/`;
      borraImagen(pathViejo);

      hospital.img = nombreArchivo;
      await hospital.save();
      return true;

      break;
    case 'usuarios':
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log('No es un usuario!!!');
        return false;
      }

      pathViejo = `./uploads/usuarios/${usuario.img}/`;
      borraImagen(pathViejo);

      usuario.img = nombreArchivo;
      await usuario.save();
      return true;

      break;

    default:
      break;
  }

}

module.exports = {
  actualizarImagen
}