import axios from "axios";

// VITE orqali URL o'qiladi
const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
});

// Foydalanuvchini ro'yxatdan o'tkazish
export const signUpUser = async (data: Record<string, any>) => {
  return api.post("user/sign-up", data);
};
