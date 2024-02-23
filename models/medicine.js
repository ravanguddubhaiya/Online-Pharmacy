"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cart, MedicineCategory }) {
      // define association here
      Medicine.hasMany(Cart, {
        foreignKey: "idMedicine",
        as: "cart",
      });
      Medicine.hasOne(MedicineCategory, {
        foreignKey: "idMedicine",
        as: "medicinecategory",
      });
    }
  }
  Medicine.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      img1: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Medicine",
    }
  );
  // Medicine.sync({ alter: true });
  return Medicine;
};
