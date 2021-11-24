const Sequelize = require("sequelize");

class DeliveryMan extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                CPF: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                }, 
                password: Sequelize.STRING,
                phone: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models){
        this.hasMany(models.Delivery, { foreignKey: "deliveryManId" })
        this.belongsTo(models.Associate, { foreignKey: "associateId" })
    }
}

module.exports = DeliveryMan;