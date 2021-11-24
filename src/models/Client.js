const Sequelize = require("sequelize");

class Client extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                companyName: Sequelize.STRING,
                CNPJ: Sequelize.STRING,
                address: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models){
        this.hasMany(models.Delivery, { foreignKey: "clientId"})
        this.belongsTo(models.Associate, { foreignKey: "associateId" })
    }
}

module.exports = Client;