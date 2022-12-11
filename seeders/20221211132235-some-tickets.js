'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tickets",
      [
        {
          subject: "Opetative System",
          description: "The computer is On but show anything",
          assignedTo: 3,
          reportedBy:2,
          state: "Open",
          severity: "Low",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subject: "Software actualization",
          description: "The compute Not want to make the actializzation",
          assignedTo: 3,
          reportedBy:2,
          state: "Pending",
          severity: "Medeo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subject: "Hardware",
          description: "The power is not working",
          assignedTo: 3,
          reportedBy:2,
          state: "Open",
          severity: "Low",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        ]

    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tickets", null, {});
  }
};
