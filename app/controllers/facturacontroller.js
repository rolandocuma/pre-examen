const db = require('../config/db.config.js');
const Factura = db.Factura;

exports.create = (req, res) => {
    let factura = {};

    try {
        factura.no_fact = req.body.no_fact;
        factura.serie = req.body.serie;
        factura.id_cliente = req.body.id_cliente;
        factura.id_empleado = req.body.id_empleado;
        factura.fecha_fac = req.body.fecha_fac;

        Factura.create(factura).then(result => {
            res.status(200).json({
                message: "Factura creada  con id = " + result.id_factura,
                factura: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear la factura!",
            error: error.message
        });
    }
};

exports.retrieveAllFacturas = (req, res) => {
    Factura.findAll()
        .then(facturaInfos => {
            res.status(200).json({
                message: "¡Facturas obtenidas exitosamente!",
                facturas: facturaInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener las facturas!",
                error: error
            });
        });
};

exports.getFacturaById = (req, res) => {
    let facturaId = req.params.id;
    Factura.findByPk(facturaId)
        .then(factura => {
            res.status(200).json({
                message: "Factura obtenida con id = " + facturaId,
                factura: factura
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener factura con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No se encontró la factura para actualizar con id = " + facturaId,
                factura: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                no_fact: req.body.no_fact,
                serie: req.body.serie,
                id_cliente: req.body.id_cliente,
                id_empleado: req.body.id_empleado,
                fecha_fac: req.body.fecha_fac
            };
            let result = await Factura.update(updatedObject, { returning: true, where: { id_factura: facturaId } });

            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar una factura con id = " + req.params.id,
                    error: "No se pudo actualizar la factura",
                });
            }

            res.status(200).json({
                message: "Actualización de factura con id = " + facturaId,
                factura: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar una factura con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No existe la factura con id = " + facturaId,
                error: "404",
            });
        } else {
            await factura.destroy();
            res.status(200).json({
                message: "Eliminación de la factura con id = " + facturaId,
                factura: factura,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar una factura con id = " + req.params.id,
            error: error.message,
        });
    }
};
