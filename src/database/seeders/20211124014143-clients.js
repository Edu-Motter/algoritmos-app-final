'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Clients",
      [
        {
          associateId: 1,
          companyName: "Client Test",
          cnpj: "03726350000121",
          address: "Address Test, 234",
        },
        {
          associateId: 1,
          companyName: "Client Test 2",
          cnpj: "03726350000122",
          address: "Address Test, 234",
        },
        {
          associateId: 2,
          companyName: "Client Test 3",
          cnpj: "03726350000133",
          address: "Address Test, 234",
        },
        {
          associateId: 2,
          companyName: "Client Test 4",
          cnpj: "03726350000134",
          address: "Address Test, 234",
        },
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Clients", null, {});
  }
};
