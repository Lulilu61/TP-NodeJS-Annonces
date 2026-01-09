"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = 10;
    const hashedAdminPassword = await bcrypt.hash("admin123", parseInt(process.env.SALT));
    const hashedLuzPassword = await bcrypt.hash("glyph_magic_rocks", parseInt(process.env.SALT));
    const hashedAmityPassword = await bcrypt.hash("Luz&Ghost", parseInt(process.env.SALT));
    const hashedEdaPassword = await bcrypt.hash("Apple_blood_lover", parseInt(process.env.SALT));
    const hashedKingPassword = await bcrypt.hash("weh_weh_weh", parseInt(process.env.SALT));
    const hashedOdaliaPassword = await bcrypt.hash("money_above_all", parseInt(process.env.SALT));

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          first_name: "Raine",
          last_name: "Whispers",
          username: "RaineAdmin",
          email: "admin@annonces.fr",
          password: hashedAdminPassword,
          role: "admin",
          phone_number: "0123456789",
          address: "Secret Hideout",
          zip_code: "00000",
          city: "Bonesborough",
          profile_picture: "/images/raine.png",
          created_at: Sequelize.fn('now'),
          updated_at: Sequelize.fn('now'),
        },
        {
          first_name: "Luz",
          last_name: "Noceda",
          username: "LuzMagie",
          email: "luz@noceda.com",
          password: hashedLuzPassword,
          role: "annonceur",
          phone_number: "0701020308",
          address: "The Owl House",
          zip_code: "99000",
          city: "Bonesborough",
          profile_picture: "/images/luz.png",
          created_at: Sequelize.fn('now'),
          updated_at: Sequelize.fn('now'),
        },
        {
          first_name: "Amity",
          last_name: "Blight",
          username: "CottonCandy",
          email: "amity@blight.com",
          password: hashedAmityPassword,
          role: "annonceur",
          phone_number: "0701020307",
          address: "Manoir Blight",
          zip_code: "99000",
          city: "Bonesborough",
          profile_picture: "/images/amity.png",
          created_at: Sequelize.fn('now'),
          updated_at: Sequelize.fn('now'),
        },
        {
          first_name: "Edalyn",
          last_name: "Clawthorne",
          username: "TheOwlLady",
          email: "eda@theowl.com",
          password: hashedEdaPassword,
          role: "annonceur",
          phone_number: "0701020304",
          address: "The Owl House",
          zip_code: "99000",
          city: "Bonesborough",
          profile_picture: "/images/eda.png",
          created_at: Sequelize.fn('now'),
          updated_at: Sequelize.fn('now'),
        },
        {
          first_name: "King",
          last_name: "Clawthorne",
          username: "KingOfDemons",
          email: "king@weh.bi",
          password: hashedKingPassword,
          role: "annonceur",
          phone_number: "0600000001",
          address: "The Owl House, Canapé",
          zip_code: "00001",
          city: "Bonesborough",
          profile_picture: "/images/king.png",
          created_at: Sequelize.fn('now'),
          updated_at: Sequelize.fn('now'),
        },
        {
          first_name: "Odalia",
          last_name: "Blight",
          username: "CEO_Blight",
          email: "odalia@blightindustries.bi",
          password: hashedOdaliaPassword,
          role: "annonceur",
          phone_number: "0666666666",
          address: "Manoir Blight, Aile Est",
          zip_code: "99000",
          city: "Bonesborough",
          profile_picture: "/images/odalia.png",
          created_at: Sequelize.fn('now'),
          updated_at: Sequelize.fn('now'),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
