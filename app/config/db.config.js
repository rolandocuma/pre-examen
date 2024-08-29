const env = require('./env.js'); 
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect, 
  dialectOptions: {
    ssl: {
      require: env.ssl, 
      rejectUnauthorized: false
    }
  },
  pool: env.pool 
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.depto = require('../models/depto.js')(sequelize, Sequelize); 

module.exports = db;
