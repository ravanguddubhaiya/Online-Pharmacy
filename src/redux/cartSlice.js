import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    cartTotalPrice: 0,
    cartTotalMedicine: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.carts[itemIndex].quantity += 1;
      } else {
        const tempMedicine = { ...action.payload, quantity: 1 };
        state.carts.push(tempMedicine);
      }
    },
    decrementItem: (state, action) => {
      const indexItem = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (action.payload.quantity <= 1) {
        return;
      } else {
        state.carts[indexItem].quantity -= 1;
      }
    },
    incrementItem: (state, action) => {
      const { medicine, quantity } = action.payload;
      const itemIndex = state.carts.findIndex(
        (item) => item.medicine.id === medicine.id
      );

      if (itemIndex !== -1) {
        state.carts[itemIndex].quantity += quantity;
      } else {
        const tempMedicine = { ...action.payload, quantity };
        state.carts.push(tempMedicine);
      }
      
    },
    removeItem: (state, action) => {
      const medicineId = action.payload;
      const newCart = state.carts.filter(
        (item) => item.medicine.id !== medicineId
      );

      if (state.carts.length === 0) {
        return {
          ...state,
          carts: newCart,
          cartTotalPrice: 0,
          cartTotalMedicine: 0,
        };
      } else {
        return { ...state, carts: newCart };
      }
    },
    showQuantity: (state, action) => {
      const { medicine, quantity } = action.payload;
      const indexItem = state.carts.findIndex(
        (item) => item.id === medicine.id
      );
      state.carts[indexItem].quantity = quantity;
    },
    getTotalPrice: (state) => {
      const totalPrice = state.carts.reduce((total, medicine) => {
        return total + medicine.medicine.price * medicine.quantity;
      }, 0);
      const totalMedicine = state.carts.reduce((total, medicine) => {
        return total + medicine.quantity;
      }, 0);

      if (totalPrice && totalMedicine) {
        state.cartTotalPrice = totalPrice;
        state.cartTotalMedicine = totalMedicine;
      }
    },
  },
});

export const {
  addToCart,
  removeItem,
  getTotalPrice,
  decrementItem,
  incrementItem,
  showQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
