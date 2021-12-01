'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DeliveryMans",
      [
        {
          associateId: 1,
          name: "Deliveryman Test",
          cpf: "11111111156",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 1,
          name: "Deliveryman Test 2",
          cpf: "11154111157",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 2,
          name: "Deliveryman Test 3 ",
          cpf: "11132111158",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 2,
          name: "Deliveryman Test 4",
          cpf: "11112111159",
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
