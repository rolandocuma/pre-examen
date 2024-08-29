const db = require('../config/db.config.js'); 
const Depto = db.depto;

exports.create = (req, res) => {
    if (!req.body.descripcion) {
        return res.status(400).send({
            message: "La descripción del departamento no puede estar vacía."
        });
    }

    const departamento = {
        id_departamento: req.body.id_departamento,
        descripcion: req.body.descripcion
    };

    Depto.create(departamento)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el departamento."
            });
        });
};

exports.findAll = (req, res) => {
    Depto.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener los departamentos."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id_departamento;

    Depto.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el departamento con id ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener el departamento."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id_departamento;

    Depto.update(req.body, {
        where: { id_departamento: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El departamento se actualizó correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el departamento con id ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el departamento."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id_departamento;

    Depto.destroy({
        where: { id_departamento: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El departamento se eliminó correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el departamento con id ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar el departamento."
            });
        });
};

exports.deleteAll = (req, res) => {
    Depto.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} departamentos se eliminaron correctamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar todos los departamentos."
            });
        });
};

