module.exports = (sequelize, Sequelize) => {

    const Factura = sequelize.define("factura", {
        id_factura: {
            type: Sequelize.NUMERIC,
            primaryKey: true
        },
        no_fact: {
            type: Sequelize.NUMERIC
        },
        serie: {
            type: Sequelize.STRING(20)
        },
        id_cliente: {
            type: Sequelize.NUMERIC
        },
        id_empleado: {
            type: Sequelize.NUMERIC
        },
        fecha_fac: {
            type: Sequelize.DATE
        }
    });

    return Factura;
};
