const Sequelize = require ('sequelize');

// dbInstance n'est pas un objet, c'est un tableau
const dbInstance = new Sequelize(`mariadb://${process.env.MARIADB_USERNAME}:${process.env.MARIADB_PASSWORD}@${process.env.MARIADB_HOST}:${process.env.MARIADB_PORT}/${process.env.MARIADB_DATABASE}`)

// Instanciation des différents modèles, ce qui va permettre création BDD et chargement dynamique des modèles

module.exports = {
    Sequelize,
    dbInstance
}