"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "JohnDoe@gmail.com",
          password: "12345",
          username: "user1",
        },
        {
          email: "JohnDoe1@gmail.com",
          password: "12345",
          username: "user1",
        },
        {
          email: "JohnDoe2@gmail.com",
          password: "12345",
          username: "user1",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
