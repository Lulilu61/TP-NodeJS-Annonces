'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reports', {
      id: {
        allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER
      },
      reporter_email: {
        type: Sequelize.STRING, allowNull: false
      },
      message: {
        type: Sequelize.TEXT, allowNull: false
      },
      annonce_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Annonces', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reports');
  }
};