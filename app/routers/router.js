const express = require('express');
const router = express.Router();

const departamentoController = require('../controllers/deptocontroller.js');
const empleadoController = require('../controllers/empleadocontroller.js');
const clienteController = require('../controllers/clientecontroller.js');
const proveedorController = require('../controllers/proveedorcontroller.js');
const productoController = require('../controllers/productocontroller.js');
const facturaController = require('../controllers/facturacontroller.js');
const FDetalleController = require('../controllers/Fdetallecontroller.js');

router.post('/api/departamentos/create', departamentoController.create);
router.get('/api/departamentos/all', departamentoController.retrieveAllDepartamentos);
router.get('/api/departamentos/onebyid/:id', departamentoController.getDepartamentoById);
router.put('/api/departamentos/update/:id', departamentoController.updateById);
router.delete('/api/departamentos/delete/:id', departamentoController.deleteById);

router.post('/api/empleados/create', empleadoController.create);
router.get('/api/empleados/all', empleadoController.retrieveAllEmpleados);
router.get('/api/empleados/onebyid/:id', empleadoController.getEmpleadoById);
router.put('/api/empleados/update/:id', empleadoController.updateById);
router.delete('/api/empleados/delete/:id', empleadoController.deleteById);

router.post('/api/clientes/create', clienteController.create);
router.get('/api/clientes/all', clienteController.retrieveAllClientes);
router.get('/api/clientes/onebyid/:id', clienteController.getClienteById);
router.put('/api/clientes/update/:id', clienteController.updateById);
router.delete('/api/clientes/delete/:id', clienteController.deleteById);

router.post('/api/proveedores/create', proveedorController.create);
router.get('/api/proveedores/all', proveedorController.retrieveAllProveedores);
router.get('/api/proveedores/onebyid/:id', proveedorController.getProveedorById);
router.put('/api/proveedores/update/:id', proveedorController.updateById);
router.delete('/api/proveedores/delete/:id', proveedorController.deleteById);

router.post('/api/productos/create', productoController.create);
router.get('/api/productos/all', productoController.retrieveAllProductos);
router.get('/api/productos/onebyid/:id', productoController.getProductoById);
router.put('/api/productos/update/:id', productoController.updateById);
router.delete('/api/productos/delete/:id', productoController.deleteById);

router.post('/api/facturas/create', facturaController.create);
router.get('/api/facturas/all', facturaController.retrieveAllFacturas);
router.get('/api/facturas/onebyid/:id', facturaController.getFacturaById);
router.put('/api/facturas/update/:id', facturaController.updateById);
router.delete('/api/facturas/delete/:id', facturaController.deleteById);

router.post('/api/factura_detalle/create', FDetalleController.create);
router.get('/api/factura_detalle/all', FDetalleController.retrieveAllDetalles);
router.get('/api/factura_detalle/onebyid/:id_factura/:id_linea', FDetalleController.getDetalleById);
router.put('/api/factura_detalle/update/:id_factura/:id_linea', FDetalleController.updateById);
router.delete('/api/factura_detalle/delete/:id_factura/:id_linea', FDetalleController.deleteById);

module.exports = router;


