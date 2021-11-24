'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Associate",
      [
        {
          companyName: "Company Test",
          password: "teste@123",
          address: "Address Test, 234",
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Associate", null, {});
  }
};
