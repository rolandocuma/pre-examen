const db = require('../config/db.config.js');
const Fdetalle = db.Fdetalle;

exports.create = (req, res) => {
    let detalle = {};

    try {
        detalle.id_factura = req.body.id_factura;
        detalle.id_linea = req.body.id_linea;
        detalle.id_producto = req.body.id_producto;
        detalle.cantidad = req.body.cantidad;

        Fdetalle.create(detalle).then(result => {
            res.status(200).json({
                message: "Detalle de factura creado exitosamente con id_factura = " + result.id_factura + " y id_linea = " + result.id_linea,
                detalle: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el detalle de la factura!",
            error: error.message
        });
    }
};

exports.retrieveAllDetalles = (req, res) => {
    Fdetalle.findAll()
        .then(detalleInfos => {
            res.status(200).json({
                message: "¡Detalles de facturas obtenidos exitosamente!",
                detalles: detalleInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los detalles de las facturas!",
                error: error
            });
        });
};

exports.getDetalleById = (req, res) => {
    let facturaId = req.params.id_factura;
    let lineaId = req.params.id_linea;
    Fdetalle.findOne({ where: { id_factura: facturaId, id_linea: lineaId } })
        .then(detalle => {
            res.status(200).json({
                message: "Detalle de factura obtenido exitosamente con id_factura = " + facturaId + " y id_linea = " + lineaId,
                detalle: detalle
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener el detalle de factura con id_factura y id_linea!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let facturaId = req.params.id_factura;
        let lineaId = req.params.id_linea;
        let detalle = await FacturaDetalle.findOne({ where: { id_factura: facturaId, id_linea: lineaId } });

        if (!detalle) {
            res.status(404).json({
                message: "No se encontró el detalle de factura para actualizar con id_factura = " + facturaId + " y id_linea = " + lineaId,
                detalle: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                id_producto: req.body.id_producto,
                cantidad: req.body.cantidad
            };

            let result = await Fdetalle.update(updatedObject, { returning: true, where: { id_factura: facturaId, id_linea: lineaId } });

            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar el detalle de factura con id_factura = " + facturaId + " y id_linea = " + lineaId,
                    error: "No se pudo actualizar el detalle de la factura",
                });
            };

            res.status(200).json({
                message: "Actualización exitosa del detalle de factura con id_factura = " + facturaId + " y id_linea = " + lineaId,
                detalle: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el detalle de factura con id_factura = " + req.params.id_factura + " y id_linea = " + req.params.id_linea,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let facturaId = req.params.id_factura;
        let lineaId = req.params.id_linea;
        let detalle = await Fdetalle.findOne({ where: { id_factura: facturaId, id_linea: lineaId } });

        if (!detalle) {
            res.status(404).json({
                message: "No existe el detalle de factura con id_factura = " + facturaId + " y id_linea = " + lineaId,
                error: "404",
            });
        } else {
            await detalle.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del detalle de factura con id_factura = " + facturaId + " y id_linea = " + lineaId,
                detalle: detalle,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el detalle de factura con id_factura = " + req.params.id_factura + " y id_linea = " + req.params.id_linea,
            error: error.message,
        });
    }
};
