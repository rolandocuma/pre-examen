const db = require('../config/db.config.js');
const Depto = db.Depto;

exports.create = (req, res) => {
    let departamento = {};

    try {
        departamento.descripcion = req.body.descripcion;

        Depto.create(departamento).then(result => {
            res.status(200).json({
                message: "Departamento creado exitosamente con id = " + result.id_depto,
                departamento: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el departamento!",
            error: error.message
        });
    }
};

exports.retrieveAllDepartamentos = (req, res) => {
    Depto.findAll()
        .then(departamentoInfos => {
            res.status(200).json({
                message: "¡Departamentos obtenidos exitosamente!",
                departamentos: departamentoInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los departamentos!",
                error: error
            });
        });
};

exports.getDepartamentoById = (req, res) => {
    let departamentoId = req.params.id;
    Depto.findByPk(departamentoId)
        .then(departamento => {
            res.status(200).json({
                message: "Departamento obtenido exitosamente con id = " + departamentoId,
                departamento: departamento
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener departamento con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let departamentoId = req.params.id;
        let departamento = await Depto.findByPk(departamentoId);
    
        if (!departamento) {
            res.status(404).json({
                message: "No se encontró el departamento para actualizar con id = " + departamentoId,
                departamento: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                descripcion: req.body.descripcion
            }
            let result = await Depto.update(updatedObject, { returning: true, where: { id_depto: departamentoId } });
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un departamento con id = " + req.params.id,
                    error: "No se pudo actualizar el departamento",
                });
            };

            res.status(200).json({
                message: "Actualización exitosa de un departamento con id = " + departamentoId,
                departamento: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un departamento con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let departamentoId = req.params.id;
        let departamento = await Depto.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "No existe el departamento con id = " + departamentoId,
                error: "404",
            });
        } else {
            await departamento.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del departamento con id = " + departamentoId,
                departamento: departamento,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un departamento con id = " + req.params.id,
            error: error.message,
        });
    }
};
