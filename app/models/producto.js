module.exports = (sequelize, Sequelize) => {

    const Producto = sequelize.define("producto", {
        id_producto: {
            type: Sequelize.NUMERIC,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING(100)
        },
        stock: {
            type: Sequelize.NUMERIC
        },
        stock_minimo: {
            type: Sequelize.NUMERIC
        },
        precio_unitario: {
            type: Sequelize.FLOAT
        },
   
    });

    return Producto;
};
