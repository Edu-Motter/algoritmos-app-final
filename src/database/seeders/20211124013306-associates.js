'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Associates",
      [
        {
          cnpj: "02.726.350/0001-28",
          companyName: "Company Test",
          password: "teste@123",
          address: "Address Test, 234",
        },
        {
          cnpj: "02.726.350/1111-28",
          companyName: "Company Test 2",
          password: "teste@123",
          address: "Address Test, 567",
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Associates", null, {});
  }
};
