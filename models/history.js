"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Customer }) {
      // define association here
      History.belongsTo(Customer, { foreignKey: "idCustomer" });
    }
  }
  History.init(
    {
      idCustomer: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      medicineid: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      fullname: DataTypes.STRING,
      total: DataTypes.STRING,
      card_number: DataTypes.INTEGER,
      cvv: DataTypes.STRING,
      valid_date: DataTypes.STRING,
      status: {
        type: DataTypes.TINYINT,
        defaultValue: false,
      },
      delivery: {
        type: DataTypes.TINYINT,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  // History.sync({ alter: true });
  return History;
};
