import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutCustomerFailed,
  logoutCustomerStart,
  logoutCustomerSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../../redux/authSlice";
import { DOMAIN } from "../../settings/config";
import axios from "axios";

export const loginCustomer = async (dispatch, navigate, customer) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${DOMAIN}/api/v1/customer/login`, customer);
    dispatch(loginSuccess(response.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed(err));
  }
};

export const registerCustomer = async (dispatch, navigate, customer) => {
  dispatch(registerStart());
  try {
    await axios.post(`${DOMAIN}/api/v1/customer/register`, customer);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed(err.response.data));
  }
};

export const logoutCustomer = async (
  dispatch,
  id,
  accessToken,
  navigate,
  axiosJWT
) => {
  dispatch(logoutCustomerStart());
  try {
    await axiosJWT.post(`${DOMAIN}/api/v1/customer/logout`, id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(logoutCustomerSuccess());
    localStorage.clear();
    navigate("/");
  } catch (err) {
    dispatch(logoutCustomerFailed(err));
  }
};
