'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // sprawdź czy tabela pusta
    const [rows] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) AS cnt FROM `Messages`;'
    );
    const count = Number(rows?.[0]?.cnt || 0);
    if (count > 0) {
      console.log('Seed pominięty – Messages nie jest puste.');
      return;
    }

    const now = new Date();
    await queryInterface.bulkInsert('Messages', [
      { content: 'Hello World!', createdAt: now, updatedAt: now },
      { content: 'Docker + Sequelize działa', createdAt: now, updatedAt: now },
      { content: 'To jest przykładowa wiadomość w seedzie.', createdAt: now, updatedAt: now },
      { content: 'Coś nowego.', createdAt: now, updatedAt: now },
      { content: 'Docker file exe.', createdAt: now, updatedAt: now }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
