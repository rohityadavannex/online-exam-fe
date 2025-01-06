import { usePatch, usePost } from "src/http-clients/clients";

export const useUpdateProfile = () => {
  return usePatch(`/users/user-info`);
};

export const useUpdatePassword = () => {
  return usePost(`/users/update-password`);
};
