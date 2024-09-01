module.exports = (sequelize, Sequelize) => {

    const Factura = sequelize.define("factura", {
        id_factura: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        no_fact: {
            type: Sequelize.INTEGER
        },
        serie: {
            type: Sequelize.STRING(20)
        },
        id_cliente: {
            type: Sequelize.INTEGER
        },
        id_empleado: {
            type: Sequelize.INTEGER
        },
        fecha_fac: {
            type: Sequelize.DATE
        }
    });

    return Factura;
};
