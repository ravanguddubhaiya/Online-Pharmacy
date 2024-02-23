const { Cart, Customer } = require("../../models");

const getCartByCustomer = async (idCustomer) => {
  try {
    const cartCustomer = await Cart.findAll({
      where: {
        idCustomer,
      },
    });
    return cartCustomer;
  } catch (err) {
    console.log(err);
  }
};

const addToCart = async (medicine) => {
  try {
    const carts = await Cart.create(medicine);
    return carts;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCartByCustomer,
  addToCart,
};
