const db = require('../config/db.config.js');
const Proveedor = db.Proveedor;

// Crear un nuevo proveedor
exports.create = (req, res) => {
    let proveedor = {};

    try {
        proveedor.id_proveedor = req.body.id_proveedor;
        proveedor.empresa = req.body.empresa;
        proveedor.direccion = req.body.direccion;
        proveedor.telefono = req.body.telefono;
        proveedor.nit = req.body.nit;
        proveedor.ciudad = req.body.ciudad;
        proveedor.pais = req.body.pais;
        proveedor.contacto = req.body.contacto;
        proveedor.email = req.body.email;
        proveedor.telefono_contacto = req.body.telefono_contacto;
        proveedor.estatus = req.body.estatus;

        Proveedor.create(proveedor).then(result => {
            res.status(200).json({
                message: "Proveedor creado exitosamente con id = " + result.id_proveedor,
                proveedor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el proveedor!",
            error: error.message
        });
    }
};

// Obtener todos los proveedores
exports.retrieveAllProveedores = (req, res) => {
    Proveedor.findAll()
        .then(proveedorInfos => {
            res.status(200).json({
                message: "¡Proveedores obtenidos exitosamente!",
                proveedores: proveedorInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los proveedores!",
                error: error
            });
        });
};

// Obtener un proveedor por ID
exports.getProveedorById = (req, res) => {
    let proveedorId = req.params.id;
    Proveedor.findByPk(proveedorId)
        .then(proveedor => {
            res.status(200).json({
                message: "Proveedor obtenido exitosamente con id = " + proveedorId,
                proveedor: proveedor
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener proveedor con id!",
                error: error
            });
        });
};

// Actualizar un proveedor por ID
exports.updateById = async (req, res) => {
    try {
        let proveedorId = req.params.id;
        let proveedor = await Proveedor.findByPk(proveedorId);
    
        if (!proveedor) {
            res.status(404).json({
                message: "No se encontró el proveedor para actualizar con id = " + proveedorId,
                proveedor: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                empresa: req.body.empresa,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                nit: req.body.nit,
                ciudad: req.body.ciudad,
                pais: req.body.pais,
                contacto: req.body.contacto,
                email: req.body.email,
                telefono_contacto: req.body.telefono_contacto,
                estatus: req.body.estatus
            };
            let result = await Proveedor.update(updatedObject, { returning: true, where: { id_proveedor: proveedorId } });
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un proveedor con id = " + req.params.id,
                    error: "No se pudo actualizar el proveedor",
                });
            }

            res.status(200).json({
                message: "Actualización exitosa de un proveedor con id = " + proveedorId,
                proveedor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un proveedor con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un proveedor por ID
exports.deleteById = async (req, res) => {
    try {
        let proveedorId = req.params.id;
        let proveedor = await Proveedor.findByPk(proveedorId);

        if (!proveedor) {
            res.status(404).json({
                message: "No existe el proveedor con id = " + proveedorId,
                error: "404",
            });
        } else {
            await proveedor.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del proveedor con id = " + proveedorId,
                proveedor: proveedor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un proveedor con id = " + req.params.id,
            error: error.message,
        });
    }
};
