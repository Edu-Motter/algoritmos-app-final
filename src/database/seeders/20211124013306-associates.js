'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Associates",
      [
        {
          cnpj: "02726350000143",
          companyName: "Company California",
          password: "california@123",
          address: "Avenida Sete de Setembro, 234",
        },
        {
          cnpj: "18326350111144",
          companyName: "Company Malibu",
          password: "malibu@123",
          address: "Miguel Abraao, 567",
        },
        {
          cnpj: "80726350111145",
          companyName: "Company Pra Voce ",
          password: "pv@123",
          address: "Marechal Anor Teixiera dos Santos, 245",
        },
        {
          cnpj: "01726350111146",
          companyName: "Company Bom Gosto ",
          password: "gosto@189",
          address: "Trajanos Reis, 70",
        },
        {
          cnpj: "02726350111147",
          companyName: "Company Vila Delivery",
          password: "vila@456",
          address: "Avenida Presidente Quenedy, 1200",
        },
        {
          cnpj: "02726350111128",
          companyName: "Company Go Fast",
          password: "fast#233",
          address: "Avenida Republica Argentina, 300",
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Associates", null, {});
  }
};
