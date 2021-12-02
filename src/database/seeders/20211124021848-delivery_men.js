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
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 1,
          name: "Deliveryman Test 2",
          cpf: "11154111157",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 2,
          name: "Deliveryman Test 3 ",
          cpf: "11132111158",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 2,
          name: "Deliveryman Test 4",
          cpf: "464.836.158-09",
          password: "$2a$12$iRlAQI2QZgmK/ahbAZDamOUKt.lJIV.niARyACRqhpjE4xXIpA5gi",
          phone: "(41) 99999-9999",
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DeliveryMans", null, {});
  }
};
