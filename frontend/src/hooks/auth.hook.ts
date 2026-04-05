import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, loginUser, registerUser } from "@/services/auth.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};