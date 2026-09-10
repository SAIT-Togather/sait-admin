import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("SAIT_ACCESS_TOKEN");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("SAIT_ACCESS_TOKEN");
      localStorage.removeItem("SAIT_REFRESH_TOKEN");
      localStorage.removeItem("SAIT_USER_ID");
      localStorage.removeItem("SAIT_LOGIN_ID");
      localStorage.removeItem("SAIT_USER_NAME");
      localStorage.removeItem("SAIT_USER_ROLE");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;