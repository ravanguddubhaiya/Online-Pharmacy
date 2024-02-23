const { MedicineCategory } = require("../../models");
const { Op } = require("sequelize");

const addCategory = async (data) => {
  try {
    const newCategory = await MedicineCategory.create(data);
    return newCategory;
  } catch (err) {
    console.log(err);
  }
};

const getListCategory = async () => {
  try {
    const listCategory = await MedicineCategory.findAll();
    return listCategory;
  } catch (err) {
    console.log(err);
  }
};

const getCategoryById = async (id) => {
  try {
    const category = await MedicineCategory.findOne({
      where: {
        id,
      },
    });
    return category;
  } catch (err) {
    console.log(err);
  }
};




const deleteCategory = async (id) => {
  try {
    const categoryId = await MedicineCategory.destroy({
      where: {
        id,
      },
    });
    return categoryId;
  } catch (err) {
    console.log(err);
  }
};

const updateCategory = async (id, data) => {
  try {
    const category = await MedicineCategory.update(data, {
      where: {
        id,
      },
    });
    return category;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addCategory,
  getListCategory,
  getCategoryById,
  getListCategory,
  deleteCategory,
  updateCategory,
};
