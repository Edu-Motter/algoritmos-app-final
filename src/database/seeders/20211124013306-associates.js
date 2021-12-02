'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Associates",
      [
        {
          cnpj: "11.111.111/1111-11",
          companyName: "Company UFPR",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          address: "Avenida Sete de Setembro, 234",
        },
        {
          cnpj: "02.726.350/0001-42",
          companyName: "Company Malibu",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          address: "Miguel Abraao, 567",
        },
        {
          cnpj: "02.726.350/0001-41",
          companyName: "Company Pra Voce ",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          address: "Marechal Anor Teixiera dos Santos, 245",
        },
        {
          cnpj: "02.726.351/0001-43",
          companyName: "Company Bom Gosto ",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          address: "Trajanos Reis, 70",
        },
        {
          cnpj: "02.726.352/0001-43",
          companyName: "Company Vila Delivery",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          address: "Avenida Presidente Quenedy, 1200",
        },
        {
          cnpj: "03.726.350/0001-43",
          companyName: "Company Go Fast",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          address: "Avenida Republica Argentina, 300",
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Associates", null, {});
  }
};
