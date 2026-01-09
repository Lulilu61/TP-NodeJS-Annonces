require('dotenv').config();

const dbConfig = {
  dialect: 'mariadb',
  host: process.env.MARIADB_HOST,
  port: Number(process.env.MARIADB_PORT) || 3306,
  username: process.env.MARIADB_USERNAME,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
};

module.exports = {
  development: dbConfig,
  production: dbConfig,
  test: dbConfig
};