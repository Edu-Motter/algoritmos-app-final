'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Client",
      [
        {
          associateId: 1,
          companyName: "Client Test",
          cnpj: "03.726.350/0001-28",
          address: "Address Test, 234",
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Client", null, {});
  }
};
