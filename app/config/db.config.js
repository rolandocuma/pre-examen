const env = require('./env.js');
const Sequelize = require('sequelize'); 
const { pool } = env; 

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    operatorAliases: false, 
    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; 

db.Empleado = require('../models/empleados.js')(sequelize, Sequelize);
db.Depto = require('../models/departamento.js')(sequelize, Sequelize);
db.Cliente = require('../models/cliente.js')(sequelize, Sequelize);
db.Proveedor = require ('../models/proveedor.js')(sequelize, Sequelize);
db.Producto = require ('../models/producto.js')(sequelize, Sequelize);
db.Factura = require ('../models/factura.js')(sequelize, Sequelize);
db.Factura = require ('../models/Fdetalle.js')(sequelize, Sequelize);

module.exports = db;