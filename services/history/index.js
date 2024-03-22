const { History, Customer } = require("../../models");

const gethistory = async (idCustomer) => {
  try {
    const historyCustomer = await History.findAll({
      where: {
        idCustomer,
      },
    });
    return historyCustomer;
  } catch (err) {
    console.log(err);
  }
};

const createHistory = async (data) => {
  try {
    console.log(data)
    const newHistory = await History.create(data);
    return newHistory;
  } catch (err) {
    console.log(err);
  }
};

const getListHistory = async () => {
  try {
    const listHistory = await History.findAll();
    return listHistory;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  gethistory,
  createHistory,
  getListHistory,
};
