'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          comment: "Are you taking to much time",
          userId: 3,
          ticketId:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          comment: "Are you taking to much time",
          userId: 3,
          ticketId:3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          comment: "Are you taking to much time",
          userId: 3,
          ticketId:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        ]

    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  }
};
