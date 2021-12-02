'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Associates",
      [
        {
          cnpj: "02.726.350/0001-43",
          companyName: "Company California",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          address: "Avenida Sete de Setembro, 234",
        },
        {
          cnpj: "18326350111144",
          companyName: "Company Malibu",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          address: "Miguel Abraao, 567",
        },
        {
          cnpj: "80726350111145",
          companyName: "Company Pra Voce ",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          address: "Marechal Anor Teixiera dos Santos, 245",
        },
        {
          cnpj: "01726350111146",
          companyName: "Company Bom Gosto ",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          address: "Trajanos Reis, 70",
        },
        {
          cnpj: "02726350111147",
          companyName: "Company Vila Delivery",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          address: "Avenida Presidente Quenedy, 1200",
        },
        {
          cnpj: "02726350111128",
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
