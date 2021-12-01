'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DeliveryMans",
      [
        {
          associateId: 1,
          name: "Deliveryman José",
          cpf: "11111111150",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 1,
          name: "Deliveryman Cardoso",
          cpf: "11154111150",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 2,
          name: "Deliveryman Pedro ",
          cpf: "11132111150",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 3,
          name: "Deliveryman Matheus",
          cpf: "11112111150",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 3,
          name: "Deliveryman Eduardo",
          cpf: "11112111150",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 5,
          name: "Deliveryman Paulo",
          cpf: "11112111150",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 6,
          name: "Deliveryman Jorge",
          cpf: "11112111150",
          password: "teste@123",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 6,
          name: "Deliveryman Emanuel",
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
