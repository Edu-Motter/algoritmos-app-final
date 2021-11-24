'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DeliveryMan",
      [
        {
          associateId: 1,
          name: "Client Test",
          cpf: "111.111.111-50",
          password: "teste@123",
          phone: "(41) 99999-9999",
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DeliveryMan", null, {});
  }
};
