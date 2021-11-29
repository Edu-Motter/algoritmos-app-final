'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DeliveryMans",
      [
        {
          associateId: 1,
          name: "Deliveryman Test",
          cpf: "11111111150",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 1,
          name: "Deliveryman Test 2",
          cpf: "11154111150",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 2,
          name: "Deliveryman Test 3 ",
          cpf: "11132111150",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 2,
          name: "Deliveryman Test 4",
          cpf: "11112111150",
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
