const Sequelize = require("sequelize");

class Associate extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                companyName: Sequelize.STRING,
                cnpj: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                }, 
                password: Sequelize.STRING,
                address: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
            },
            {
                sequelize,
            }
        );
    }

    static associate(models){
        this.hasMany(models.Delivery, { foreignKey: "associateId"})
        this.hasMany(models.Client, { foreignKey: "associateId"})
        this.hasMany(models.DeliveryMan, { foreignKey: "associateId"})
    }
}

module.exports = Associate;