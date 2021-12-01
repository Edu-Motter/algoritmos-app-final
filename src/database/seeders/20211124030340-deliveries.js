'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Deliveries",
      [
        {
          associateId: 1,
          deliveryManId: 1,
          clientId: 1,
          description: "Descrition... test.. ",
          delivered: true,
          value: 20.99,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 2,
          deliveryManId: 2,
          clientId: 2,
          description: "Descrition... test.. ",
          delivered: true,
          value: 30.99,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 3,
          deliveryManId: 3,
          clientId: 3,
          description: "Descrition... test.. ",
          delivered: true,
          value: 40.99,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 4,
          deliveryManId: 4,
          clientId: 4,
          description: "Descrition... test.. ",
          delivered: true,
          value: 22.59,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 5,
          deliveryManId: 5,
          clientId: 5,
          description: "Descrition... test.. ",
          delivered: true,
          value: 34.99,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 6,
          deliveryManId: 6,
          clientId: 6,
          description: "Descrition... test.. ",
          delivered: true,
          value: 50.509,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        }
      ]
    );
    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Deliveries", null, {});
  }
};
