"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Customer, Medicine }) {
      // define association here
      Cart.belongsTo(Customer, { foreignKey: "idCusotmer" });
      Cart.belongsTo(Medicine, { foreignKey: "idMedicine" });
    }
  }
  Cart.init(
    {
      idCustomer: DataTypes.INTEGER,
      idMedicine: DataTypes.INTEGER,
      nameMedicine: DataTypes.STRING,
      priceMedicine: DataTypes.STRING,
      count: DataTypes.INTEGER,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  // Cart.sync({ alter: true });
  return Cart;
};
