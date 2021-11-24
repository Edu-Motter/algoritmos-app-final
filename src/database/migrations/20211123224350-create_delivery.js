'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Delivery", {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      associateId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Associate", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      deliveryManId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "DeliveryMan", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      clientId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Client", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      description:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivered: {
         type: Sequelize.BOOLEAN,
         allowNull: false,
         defaultValue: false
      },     
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      deliveredAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },    
      createdAt:{
       type:Sequelize.DATE,
       allowNull:false,
       defaultValue:Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Delivery");
  }
};
