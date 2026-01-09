require('dotenv').config();

module.exports = {

  development: {

    dialect: 'mariadb',

    host: process.env.MARIADB_HOST,

    port: Number(process.env.MARIADB_PORT),

    username: process.env.MARIADB_USERNAME,

    password: process.env.MARIADB_PASSWORD,

    database: process.env.MARIADB_DATABASE,

  }

};