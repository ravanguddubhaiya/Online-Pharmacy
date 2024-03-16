import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: {
      isCustomer: [],
      isFetching: false,
      error: false,
    },
    deleteCustomer: {
      isFetching: false,
      error: false,
      isSuccess: false,
    },
  },
  reducers: {
    getCustomerStart: (state) => {
      state.customers.isFetching = true;
    },
    getCustomerSuccess: (state, action) => {
      state.customers.isFetching = false;
      state.customers.isCustomer = action.payload;
    },
    getCustomerFailed: (state) => {
      state.customers.isFetching = false;
      state.customers.error = true;
    },
    deleteCustomerStart: (state) => {
      state.deleteCustomer.isFetching = true;
    },
    deleteCustomerSuccess: (state) => {
      state.deleteCustomer.isFetching = false;
      state.deleteCustomer.isSuccess = true;
    },
    deleteCustomerFailed: (state) => {
      state.deleteCustomer.isFetching = false;
      state.deleteCustomer.error = true;
    },
  },
});

export const {
  getCustomerStart,
  getCustomerSuccess,
  getCustomerFailed,
  deleteCustomerSuccess,
  deleteCustomerStart,
  deleteCustomerFailed,
} = customerSlice.actions;

export default customerSlice.reducer;
