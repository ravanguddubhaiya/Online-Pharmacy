const { Medicine } = require("../../models");
const { Op } = require("sequelize");

const addMedicine = async (data) => {
  try {
    const newMedicine = await Medicine.create(data);
    return newMedicine;
  } catch (err) {
    console.log(err);
  }
};

const getListMedicine = async () => {
  try {
    const listMedicine = await Medicine.findAll();
    return listMedicine;
  } catch (err) {
    console.log(err);
  }
};

const getMedicineById = async (id) => {
  try {
    const medicine = await Medicine.findOne({
      where: {
        id,
      },
    });
    return medicine;
  } catch (err) {
    console.log(err);
  }
};

const getMedicineByCategory = async (category) => {
  try {
    const medicine = await Medicine.findAll({
      where: {
        category,
      },
    });
    return medicine;
  } catch (err) {
    console.log(err);
  }
};

const panigationMedicine = async (size, page) => {
  try {
    const medicine = await Medicine.findAndCountAll({
      limit: size,
      offset: (page - 1) * size,
    });
    return medicine;
  } catch (err) {
    console.log(err);
  }
};

const deleteMedicine = async (id) => {
  try {
    const medicineId = await Medicine.destroy({
      where: {
        id,
      },
    });
    return medicineId;
  } catch (err) {
    console.log(err);
  }
};

const updateMedicine = async (id, data) => {
  try {
    const medicine = await Medicine.update(data, {
      where: {
        id,
      },
    });
    return medicine;
  } catch (err) {
    console.log(err);
  }
};

const searchMedicine = async (search) => {
  try {
    const medicine = await Medicine.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%search%",
            },
          },
          {
            price: {
              [Op.like]: "%search%",
            },
          },
          {
            category: {
              [Op.like]: "%search",
            },
          },
        ],
      },
    });
    return medicine;
  } catch (err) {}
};

module.exports = {
  addMedicine,
  getListMedicine,
  getMedicineByCategory,
  getMedicineById,
  panigationMedicine,
  deleteMedicine,
  updateMedicine,
  searchMedicine,
};
