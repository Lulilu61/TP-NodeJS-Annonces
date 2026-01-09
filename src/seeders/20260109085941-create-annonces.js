'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Annonces', [
      {
        title: "Manuel sur l'utilisation des glyphes",
        description: 'Apprenez à utiliser les glyphes grâce à ce manuel illustré, expliquant simplement les différents glyphes et les combinasons possibles. ',
        price: 45.50,
        status: 'visible',
        user_id: 1, // Luz
        category_id: 1, // Magie
        filepath: '/uploads/glyph.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Lot d'objets humains rares",
        description: "Nouvel arrivage de reliques humaines extrémement rares, parmi lesquelles un livre illustrant les bêtes fantastiques de ce monde comme les baleines ou les capybaras, des jeux de cartes, et bien d'autres. Prix ferme.",
        price: 20.00,
        status: 'visible',
        user_id: 4, //Eda
        category_id: 3, //Objets humains
        filepath: '/uploads/junk.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Abomaton Sécurité Max',
        description: "Pourquoi s'embêter avec des gardes qui dorment ? L'Abomaton 2.0 est obéissant, puissant et n'a pas besoin de pause déjeuner. Idéal pour conquérir... oups, protéger votre maison. Attention : peut causer des destructions massives involontaires.",
        price: 1500.00,
        status: 'visible',
        user_id: 6, // Odalia
        category_id: 6, // Technologie
        filepath: '/uploads/abomaton.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Cours de Barde : Musique de Résistance',
        description: 'Apprenez à manipuler les sons pour créer des illusions ou briser des sorts de pétrification. Discrétion exigée. Apportez votre propre instrument.',
        price: 15.50,
        status: 'visible',
        user_id: 1, // Raine
        category_id: 5, // Cours
        filepath: '/uploads/bard.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Cours de Tyrannie',
        description: "Apprenez à asservir les masses avec style. Leçons de 'Weh !' et techniques de sieste stratégique incluses. Apportez vos propres crackers.",
        price: 99.99,
        status: 'visible',
        user_id: 5, // King
        category_id: 5, // Cours
        filepath: '/uploads/king.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Annonces', null, {});
  }
};