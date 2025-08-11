'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Messages', [
      {
        content: 'Hello World!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Docker + Sequelize działa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'To jest przykładowa wiadomość w seedzie.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
