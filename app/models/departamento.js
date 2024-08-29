module.exports = (sequelize, Sequelize) => {

    const Depto = sequelize.define("departamento", {
        id_depto: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING
        }
    });
    return Depto;
};