import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentCustomer: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      isSuccess: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentCustomer = action.payload;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
      
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.isSuccess = true;
      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.isSuccess = false;
      state.register.error = true;
    },
    logoutCustomerStart: (state) => {
      state.login.isFetching = true;
    },
    logoutCustomerSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentCustomer = null;
    },
    logoutCustomerFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutCustomerStart,
  logoutCustomerSuccess,
  logoutCustomerFailed,
} = authSlice.actions;
export default authSlice.reducer;
