const db = require("../models");
const { sendEmail } = require("../utils/mailer");

module.exports = {
  create: async (data) => {
    if (!db.Annonce) {
      throw new Error("Le modèle 'Annonce' n'a pas été chargé");
    }

    const newAnnonce = await db.Annonce.create(data);
    sendEmail(
      process.env.MAIL_ADMIN,
      "Nouvelle annonce publiée !",
      `Une nouvelle annonce intitulée "${data.title}" vient d'être créée.`,
      `<html><h1>Confirmation</h1><p>L'annonce <b>${data.title}</b> est en ligne.</p></html>`
    );

    return newAnnonce;
  },

  update: async (id, data) => {
    return await db.Annonce.update(data, { where: { id } });
  },

  updateStatus: async (id, status, admin_comment) => {
    return await db.Annonce.update(
      { status, admin_comment },
      { where: { id } }
    );
  },

  findAll: async (filters) => {
    return await db.Annonce.findAll({ where: filters });
  },

  findById: async (id) => {
    return await db.Annonce.findByPk(id);
  },

  delete: async (id) => {
    return await db.Annonce.destroy({ where: { id } });
  },
};
