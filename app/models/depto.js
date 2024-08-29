module.exports = (sequelize, Sequelize) => {
    const Depto = sequelize.define('departamentos', { 
        id_departamento: {
            type: Sequelize.NUMERIC, // Asegúrate de que sea compatible con tu base de datos
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING(80),
            allowNull: false
        }
    });

    return Depto;
};
