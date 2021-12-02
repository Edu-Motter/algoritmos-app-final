'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Clients",
      [
        {
          associateId: 1,
          companyName: "Clinte Bom",
          cnpj: "03.726.350/0001-21",
          address: "Address Test, 234",
        },
        {
          associateId: 1,
          companyName: "Client Ruim 2",
          cnpj: "03.726.350/0001-22",
          address: "Address Test, 233",
        },
        {
          associateId: 1,
          companyName: "Client Mediano 3",
          cnpj: "03.726.350/0001-33",
          address: "Address Test, 231",
        },
        {
          associateId: 1,
          companyName: "Client Otimo 4",
          cnpj: "03.726.350/0001-34",
          address: "Address Test, 232",
        },
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Clients", null, {});
  }
};
