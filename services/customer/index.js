"use strict";
const { Customer } = require("../../models");

const createCustomer = async (customer) => {
  try {
    const newCustomer = await Customer.create(customer);
    return newCustomer;
  } catch (err) {
    console.log(err);
  }
};

const getCustomerByEmail = async (email) => {
  try {
    const customer = await Customer.findOne({
      where: {
        email,
      },
    });
    return customer;
  } catch (err) {
    console.log(err);
  }
};

const getCustomerById = async (id) => {
  try {
    const customer = await Customer.findOne({
      where: {
        id,
      },
    });
    return customer;
  } catch (err) {
    console.log(err);
  }
};

const getListCustomer = async () => {
  try {
    const listCustomer = await Customer.findAll();
    return listCustomer;
  } catch (err) {
    console.log(err);
  }
};

const deleteCustomer = async (id) => {
  try {
    const customerDeleted = await Customer.destroy({
      where: {
        id,
      },
    });
    return customerDeleted;
  } catch (err) {
    console.log(err);
  }
};

const updateCustomer = async (id, data) => {
  try {
    const updateCustomer = await Customer.update(data, {
      where: {
        id,
      },
    });
    return updateCustomer;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createCustomer,
  getCustomerByEmail,
  getListCustomer,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
};
