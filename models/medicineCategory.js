"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MedicineCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
  }
  MedicineCategory.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      img1: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "MedicineCategory",
    }
  );
  
  return MedicineCategory;
};
