import axios from "axios";

const API_URL = "https://texnoark.ilyosbekdev.uz/auth/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
});

export const signUpUser = async (data: Record<string, any>) => {
  return api.post("user/sign-up", data);
};
