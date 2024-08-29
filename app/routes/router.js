let express = require('express');
let router = express.Router();

const controladorDepto = require('../controllers/controlador.depto.js');

// Rutas de controlador Depto
router.post('/api/departamento/create', controladorDepto.create);
router.get('/api/departamento/all', controladorDepto.findAll);
router.get('/api/departamento/:id_departamento', controladorDepto.findOne);
router.put('/api/departamento/update/:id_departamento', controladorDepto.update);
router.delete('/api/departamento/delete/:id_departamento', controladorDepto.delete);
router.delete('/api/departamento/deleteAll', controladorDepto.deleteAll);

module.exports = router;


