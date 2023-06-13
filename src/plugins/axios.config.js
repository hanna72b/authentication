import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.o2trade.ir/api/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status, data, config } = error.response;
    if (status == 403) {
      alert(error.response.data.errors.error);
    }

    if (
      status === 422 &&
      error.response.data.errors.mobile &&
      error.response.data.errors.mobile
    ) {
      alert(
        error.response.data.errors.mobile +
          " و " +
          error.response.data.errors.username
      );
    } else if (status === 422 && error.response.data.errors.mobile) {
      alert(error.response.data.errors.mobile);
    } else if (status === 422 && error.response.data.errors.username) {
      alert(error.response.data.errors.username);
    }

    return Promise.reject(error);
  }
);

export default instance;
