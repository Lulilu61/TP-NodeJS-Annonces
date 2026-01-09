const express = require('express'); 
require('dotenv').config(); 
const db = require('./models'); // Import de ton index.js (qui contient db.sequelize)

const app = express(); 
const PORT = process.env.PORT || 3000;

app.use(express.json());

const initRoutes = require('./routes/index'); 
initRoutes(app);

// On ne lance le serveur QUE si on n'est pas en train de faire des tests
if (process.env.NODE_ENV !== 'test') {
    // Le "bouton magique" pour Azure :
    db.sequelize.sync({ alter: true }) 
        .then(() => {
            console.log("La base de données est synchronisée avec succès.");
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        })
        .catch((err) => {
            console.error("ERREUR de synchronisation (Vérifie tes variables d'env et le SSL) :", err);
            // On ne lance pas le serveur si la DB n'est pas connectée
        });
}

module.exports = app;