"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cart }) {
      Customer.hasOne(Cart, {
        foreignKey: "idCustomer",
        as: "cart",
      });
    }
  }
  Customer.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1,
          max: 30,
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1,
          max: 30,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]+$/,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: 3,
          max: 50,
          isEmail: true,
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 6,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]+$/,
        },
      },
      admin: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  // User.sync({ alter: true });
  return Customer;
};
