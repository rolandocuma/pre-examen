module.exports = (sequelize, Sequelize) => {
    const Fdetalle = sequelize.define("fdetalle", {
        id_factura: {
            type: Sequelize.INTEGER,
            primaryKey: true,

        },
        id_linea: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_producto: {
            type: Sequelize.INTEGER,

        },
        cantidad: {
            type: Sequelize.INTEGER
        }
    });

    return Fdetalle;
};
