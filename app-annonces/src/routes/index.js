// Centraliser l'ensemble des routes et imbriquer les routes dans une fonction pour l'utiliser dans app.js

const annoncesRoutes = require('./annonce');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const reportRoutes = require('./report');

const initRoutes = (app) => {
    app.use('/home', (req, res, next) => {
        res.status(200).json({ message: 'Hello World !' });
    });

    app.use('/annonces', annoncesRoutes);
    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);
    app.use('/reports', reportRoutes);
}

module.exports = initRoutes;