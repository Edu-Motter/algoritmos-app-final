'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DeliveryMans",
      [
        {
          associateId: 1,
          name: "Deliveryman José",
          cpf: "111.111.111-11",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 1,
          name: "Deliveryman Cardoso",
          cpf: "222.222.222-22",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 1,
          name: "Deliveryman Pedro ",
          cpf: "333.333.333-33",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 1,
          name: "Deliveryman Matheus",
          cpf: "444.444.444-44",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 2,
          name: "Deliveryman Eduardo",
          cpf: "555.555.555-55",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 2,
          name: "Deliveryman Paulo",
          cpf: "666.666.666-66",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 7,
          name: "Deliveryman Jorge",
          cpf: "777.777.777-77",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 8,
          name: "Deliveryman Emanuel",
          cpf: "888.888.888-88",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        }
        
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DeliveryMans", null, {});
  }
};
