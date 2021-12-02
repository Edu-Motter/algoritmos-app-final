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
          associateId: 1,
          deliveryManId: 1,
          clientId: 2,
          description: "Descrition... test.. ",
          delivered: true,
          value: 30.99,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 1,
          deliveryManId: 1,
          clientId: 1,
          description: "Descrition... test.. ",
          delivered: true,
          value: 40.99,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 1,
          deliveryManId: 2,
          clientId: 1,
          description: "Descrition... test.. ",
          delivered: true,
          value: 22.59,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },{
          associateId: 1,
          deliveryManId: 3,
          clientId: 1,
          description: "Descrition... test.. ",
          delivered: true,
          value: 40.99,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 1,
          deliveryManId: 1,
          clientId: 2,
          description: "Descrition... test.. ",
          delivered: true,
          value: 22.59,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 1,
          deliveryManId: 1,
          clientId: 1,
          description: "Descrition... test.. ",
          delivered: true,
          value: 34.99,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 1,
          deliveryManId: 4,
          clientId: 3,
          description: "Descrition... test.. ",
          delivered: true,
          value: 54.09,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 1,
          deliveryManId: 2,
          clientId: 3,
          description: "Descrition... test.. ",
          delivered: true,
          value: 20.50,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 1,
          deliveryManId: 3,
          clientId: 1,
          description: "Descrition... test.. ",
          delivered: true,
          value: 100.00,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 1,
          deliveryManId: 3,
          clientId: 1,
          description: "Descrition... test.. ",
          delivered: true,
          value: 60.09,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 1,
          deliveryManId: 4,
          clientId: 3,
          description: "Descrition... test.. ",
          delivered: true,
          value: 25.50,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          associateId: 1,
          deliveryManId: 2,
          clientId: 3,
          description: "Descrition... test.. ",
          delivered: true,
          value: 40.00,
          deliveredAt: Sequelize.literal("CURRENT_TIMESTAMP")
        }
      ]
    );
    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Deliveries", null, {});
  }
};
