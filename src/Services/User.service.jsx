import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://medical-api-git-main-ayush-saxenas-projects-03883bbf.vercel.app/api/",
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
