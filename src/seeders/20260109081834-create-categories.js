'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { label: 'Magie'},
      { label: 'Potions'},
      { label: 'Objets Humains'},
      { label: 'Instruments de Musique' },
      { label: 'Cours'},
      { label: 'Technologie'}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};