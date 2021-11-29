'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Clients",
      [
        {
          associateId: 1,
          companyName: "Client Test",
          cnpj: "03726350000128",
          address: "Address Test, 234",
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Clients", null, {});
  }
};
