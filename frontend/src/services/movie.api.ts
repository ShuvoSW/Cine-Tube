/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios";

export const getMedia = async (params: any) => {
  const res = await api.get("/movie", { params });
  // console.log(res.data);
  return res.data;
};