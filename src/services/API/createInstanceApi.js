import axios from "axios";
import jwt_decode from "jwt-decode";
import { DOMAIN } from "../../settings/config";

const refreshToken = async () => {
  try {
    const response = await axios.post(`${DOMAIN}/api/v1/customer/refresh`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (customter, dispatch, stateSuccess) => {
  let newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decocedToken = jwt_decode(customter?.token);
      if (decocedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshCustomter = {
          ...customter,
          token: data.accessToken,
        };
        dispatch(stateSuccess(refreshCustomter));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
