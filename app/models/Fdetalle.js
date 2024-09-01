module.exports = (sequelize, Sequelize) => {
    const Fdetalle = sequelize.define("fdetalle", {
        id_factura: {
            type: Sequelize.NUMERIC,
            primaryKey: true,

        },
        id_linea: {
            type: Sequelize.NUMERIC,
            primaryKey: true
        },
        id_producto: {
            type: Sequelize.NUMERIC,

        },
        cantidad: {
            type: Sequelize.NUMERIC
        }
    });

    return Fdetalle;
};
