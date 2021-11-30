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
        },
        {
          associateId: 1,
          companyName: "Client Test 2",
          cnpj: "03726350000129",
          address: "Address Test, 234",
        },
        {
          associateId: 2,
          companyName: "Client Test 3",
          cnpj: "03726350000130",
          address: "Address Test, 234",
        },
        {
          associateId: 2,
          companyName: "Client Test 4",
          cnpj: "03726350000131",
          address: "Address Test, 234",
        },
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Clients", null, {});
  }
};
