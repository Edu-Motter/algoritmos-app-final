'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Clients",
      [
        {
          associateId: 1,
          companyName: "Clinte Bom",
          cnpj: "03726350000121",
          address: "Address Test, 234",
        },
        {
          associateId: 1,
          companyName: "Client Ruim 2",
          cnpj: "03726350000122",
          address: "Address Test, 233",
        },
        {
          associateId: 1,
          companyName: "Client Mediano 3",
          cnpj: "03726350000133",
          address: "Address Test, 231",
        },
        {
          associateId: 1,
          companyName: "Client Otimo 4",
          cnpj: "03726350000134",
          address: "Address Test, 232",
        },
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Clients", null, {});
  }
};
