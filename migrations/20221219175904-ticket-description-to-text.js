'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("tickets", "description", {
      type: Sequelize.TEXT
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("tickets", "description", {
      type: Sequelize.STRING
    });
  }
};
