import axios from "axios";
import Cookies from "js-cookie";
import Config from "react-native-config";

import * as Keychain from 'react-native-keychain';

const app = Config.API_URL
console.log(app)
const BASEURL = `${app}`;
const AxiosInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: true

});
AxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("__as_secure");

    if (accessToken) {
      config.headers["authorization"] = `token ${accessToken}`
    }

    return config;
  },

  (error) => {
    console.error("Request error ::", error);
    return Promise.reject(error);
  }
);



AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      let refreshToken = Cookies.get('__rs_secure');
      try {
        const res = await axios.get(
          `${app}refreshToken`,
          {
            withCredentials: true,
            headers: {
              "authorization": `token ${refreshToken}`
            }
          }
        );
        console.log(res, "RESPONSE DATA")
        Cookies.remove('__as_secure')
        Cookies.set('__as_secure', res.data);

        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        if (refreshError.response.data.error == "Refresh Token Expired") {
          console.log("COOKIES TO BE DLETING....")
          const keys = Object.keys(Cookies.get());

          for (let i = 0; i < keys.length; i++) {
            Cookies.remove(keys[i]);
          }

          window.location.href = "/login"


        }
        console.error('Refresh token failed', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default AxiosInstance;



