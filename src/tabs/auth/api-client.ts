import useFetchAsync from "src/hooks/useFetchAsync";
import { get, post } from "../../http-clients/clients";

export const login = (email: string, password: string) => {
  return post("/users/login", { email, password });
};

export const useLogin = () => {
  return useFetchAsync((email, password) =>
    post("/users/login", { email, password })
  );
};

export const register = (name: string, email: string, password: string) => {
  return post("/users/register", { name, email, password });
};

export const useRegister = () => {
  return useFetchAsync((data) => post("/users/register", data));
};

export const useForgotPassword = () => {
  return useFetchAsync(({ email }) => {
    return post("/users/forgot-password", { email });
  });
};

export const useResetPassword = () => {
  return useFetchAsync(({ password, token }) => {
    return post("/users/reset-password", { password, token });
  });
};

export const useVerifyEmail = () => {
  return useFetchAsync(({ token }) => {
    return post("/users/verify-email", { token });
  });
};

export const getUserInfo = () => {
  return get("/users/user-info");
};

export const getRoleAccess = (roleId: string) => {
  return get(`/users/role-access/${roleId}`);
};
