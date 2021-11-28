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
        }
      ]
    );
    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Deliveries", null, {});
  }
};
