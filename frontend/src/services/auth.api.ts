import { api } from "@/lib/axios";
import { ILoginData, IRegisterData } from "@/lib/types/types";

export const loginUser = async (data: ILoginData) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data: IRegisterData) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};