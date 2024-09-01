const db = require('../config/db.config.js');
const Cliente = db.Cliente;

// Crear un nuevo cliente
exports.create = (req, res) => {
    let cliente = {};

    try {
        cliente.id_cliente = req.body.id_cliente;
        cliente.nombre = req.body.nombre;
        cliente.apellido = req.body.apellido;
        cliente.razon_social = req.body.razon_social;
        cliente.nit = req.body.nit;
        cliente.direccion = req.body.direccion;
        cliente.telefono = req.body.telefono;
        cliente.email = req.body.email;
        cliente.fecha_ingreso = req.body.fecha_ingreso;
        cliente.estatus = req.body.estatus;

        Cliente.create(cliente).then(result => {
            res.status(200).json({
                message: "Se registró cliente con exito id = " + result.id_cliente,
                cliente: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el cliente!",
            error: error.message
        });
    }
};

// Obtener todos los clientes
exports.retrieveAllClientes = (req, res) => {
    Cliente.findAll()
        .then(clienteInfos => {
            res.status(200).json({
                message: "Clientes obtenidos exitosamente",
                clientes: clienteInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los clientes!",
                error: error
            });
        });
};

// Obtener un cliente por ID
exports.getClienteById = (req, res) => {
    let clienteId = req.params.id;
    Cliente.findByPk(clienteId)
        .then(cliente => {
            res.status(200).json({
                message: "Cliente obtenido exitosamente id = " + clienteId,
                cliente: cliente
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener cliente con id!",
                error: error
            });
        });
};

// Actualizar un cliente por ID
exports.updateById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);
    
        if (!cliente) {
            res.status(404).json({
                message: "No se encontró el cliente para actualizar con id = " + clienteId,
                cliente: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                razonsocial: req.body.razon_social,
                nit: req.body.nit,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                fecha_ingreso: req.body.fecha_ingreso,
                estatus: req.body.estatus
            };
            let result = await Cliente.update(updatedObject, { returning: true, where: { id_cliente: clienteId } });
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un cliente con id = " + req.params.id,
                    error: "No se pudo actualizar el cliente",
                });
            }

            res.status(200).json({
                message: "Actualización exitosa del id = " + clienteId,
                cliente: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un cliente con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un cliente por ID
exports.deleteById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No existe el cliente con id = " + clienteId,
                error: "404",
            });
        } else {
            await cliente.destroy();
            res.status(200).json({
                message: "Cliente eliminado de id = " + clienteId,
                cliente: cliente,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un cliente con id = " + req.params.id,
            error: error.message,
        });
    }
};
