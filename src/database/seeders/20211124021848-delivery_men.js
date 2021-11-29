'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DeliveryMans",
      [
        {
          associateId: 1,
          name: "Deliveryman Test",
          cpf: "111.111.111-50",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 1,
          name: "Deliveryman Test 2",
          cpf: "111.541.111-50",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 2,
          name: "Deliveryman Test 3 ",
          cpf: "111.321.111-50",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 2,
          name: "Deliveryman Test 4",
          cpf: "111.121.111-50",
          password: "teste@123",
          phone: "(41) 99999-9999",
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DeliveryMans", null, {});
  }
};
