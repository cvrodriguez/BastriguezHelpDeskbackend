'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "Alice",
          lastName: "Smith",
          password: 123,
          email: "alice.smith@gmail.com",
          role: "Admin",
          state: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Lan",
          lastName: "Hoffman",
          password: 123,
          email: "ian.hoffman@example.com",
          role: "User",
          state: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Chad",
          lastName: "Robertson",
          password: 123,
          email: "chad.robertson@example.com",
          role: "Agent",
          state: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ]
      ,
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  }
};
