// Centraliser l'ensemble des routes et imbriquers les routes dans une fonction pour l'utiliser dans app.js

const annoncesRoutes = require('./annonces');
//const userRoutes = require('./users');

const initRoutes = (app) => {
    app.use('/home', (req, res, next) => {
    res.status(200).json({
        message: 'Hello World !'
    });
});
    app.use('/annonces', annoncesRoutes);
    app.use('/users', userRoutes);
   //app.use(userRoutes);
}

module.exports = initRoutes;