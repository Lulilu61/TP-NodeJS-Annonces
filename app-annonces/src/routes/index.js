// Centraliser l'ensemble des routes et imbriquers les routes dans une fonction pour l'utiliser dans app.js

const annoncesRoutes = require('./annonce');
const userRoutes = require('./user');

const initRoutes = (app) => {
    app.use('/home', (req, res, next) => {
        res.status(200).json({ message: 'Hello World !' });
    });

    app.use('/annonces', annoncesRoutes);
    app.use('/users', userRoutes); 
}

module.exports = initRoutes;