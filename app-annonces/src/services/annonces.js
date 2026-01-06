const { Annonce } = require('../models');

module.exports = {
    create: async (data) => {
        return await Annonce.create(data);
    },
    findAll: async (filters) => {
        return await Annonce.findAll({ where: filters });
    },
    findById: async (id) => {
        return await Annonce.findByPk(id);
    },
    update: async (id, data) => {
        return await Annonce.update(data, { where: { id } });
    }
};