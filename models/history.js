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
      cart: DataTypes.INTEGER,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      total: DataTypes.STRING,
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
