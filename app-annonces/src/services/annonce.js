const db = require('../models');

module.exports = {
    create: async (data) => {
        if (!db.Annonce) {
            console.log("Modèles dispos :", Object.keys(db));
            throw new Error("Le modèle 'Annonce' n'a pas été chargé");
        }
        return await db.Annonce.create(data);
    },
    
    findAll: async (filters) => {
        return await db.Annonce.findAll({ where: filters });
    },
    
    findById: async (id) => {
        return await db.Annonce.findByPk(id);
    },
    
    update: async (id, data) => {

        return await db.Annonce.update(data, { where: { id } });
    }
};