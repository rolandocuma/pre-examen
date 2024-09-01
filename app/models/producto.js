module.exports = (sequelize, Sequelize) => {

    const Producto = sequelize.define("producto", {
        id_producto: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING(100)
        },
        stock: {
            type: Sequelize.INTEGER
        },
        stock_minimo: {
            type: Sequelize.INTEGER
        },
        precio_unitario: {
            type: Sequelize.FLOAT
        },
   
    });

    return Producto;
};
