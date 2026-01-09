const Sequelize = require ('sequelize');
const fs = require ('fs');
const path = require('path');
const basename = path.basename(__filename);
require('dotenv').config();


const db = {};

// dbInstance n'est pas un objet, c'est un tableau
//const dbInstance = new Sequelize(`mariadb://${process.env.MARIADB_USERNAME}:${process.env.MARIADB_PASSWORD}@${process.env.MARIADB_HOST}:${process.env.MARIADB_PORT}/${process.env.MARIADB_DATABASE}`)

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', '..', 'config', 'config.js'))[env];

const dbInstance = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Instanciation des différents modèles
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(dbInstance, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = dbInstance;
db.Sequelize = Sequelize;

module.exports = db;