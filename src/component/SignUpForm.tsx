import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signUpUser } from "../servises/api";

// Form validatsiya sxemasi
const signUpSchema = yup.object().shape({
  first_name: yup.string().required("Ism majburiy").min(2, "Kamida 2 harf bo'lishi kerak"),
  last_name: yup.string().required("Familiya majburiy"),
  phone_number: yup
    .string()
    .required("Telefon raqam majburiy")
    .matches(/^\+998\d{9}$/, "To'g'ri telefon raqamini kiriting"),
  email: yup.string().email("Email noto'g'ri").required("Email majburiy"),
  password: yup
    .string()
    .required("Parol majburiy")
    .min(6, "Parol kamida 6 belgidan iborat bo'lishi kerak"),
});

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await signUpUser(data);
      alert("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
      console.log(response.data);
    } catch (error: any) {
      console.error("Ro'yxatdan o'tishda xatolik:", error.response?.data || error.message);
      alert(
        error.response?.data?.message || "Xatolik yuz berdi. Qayta urinib ko'ring."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg border-t-8 border-purple-500 transform hover:scale-105 transition-transform duration-300"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-600">
          Ro'yxatdan o'tish
        </h2>

        {/* Ism */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Ism</label>
          <input
            type="text"
            {...register("first_name")}
            className={`w-full px-4 py-3 border rounded-lg shadow focus:outline-none transition-all ${
              errors.first_name
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-400"
            }`}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
          )}
        </div>

        {/* Familiya */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Familiya</label>
          <input
            type="text"
            {...register("last_name")}
            className={`w-full px-4 py-3 border rounded-lg shadow focus:outline-none transition-all ${
              errors.last_name
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-400"
            }`}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
          )}
        </div>

        {/* Telefon raqam */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Telefon raqam</label>
          <input
            type="text"
            {...register("phone_number")}
            placeholder="+998XXXXXXXXX"
            className={`w-full px-4 py-3 border rounded-lg shadow focus:outline-none transition-all ${
              errors.phone_number
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-400"
            }`}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`w-full px-4 py-3 border rounded-lg shadow focus:outline-none transition-all ${
              errors.email
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Parol */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Parol</label>
          <input
            type="password"
            {...register("password")}
            className={`w-full px-4 py-3 border rounded-lg shadow focus:outline-none transition-all ${
              errors.password
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-400"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Ro'yxatdan o'tish
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
