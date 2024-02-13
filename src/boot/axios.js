import axios from "axios";
import { LocalStorage } from "quasar";

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

