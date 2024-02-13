import axios from "axios";
import { USER_TOKEN } from "src/variables/LocalStorage";
import { LocalStorage } from "quasar";

const api = axios.create({

  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: 'Bearer ' + LocalStorage.getItem(USER_TOKEN)
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);



export { api };
