'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Associate", {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      companyName: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
 
      },
      address: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Associate");
  }
};