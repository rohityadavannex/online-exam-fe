import { useCallback } from "react";
import useFetchAsync from "src/hooks/useFetchAsync";
import { patch, post } from "src/http-clients/clients";

export const useUpdateUserProfile = () => {
  const updateData = useCallback((name: string | number) => {
    return patch(`/users/user-info`, { name });
  }, []);
  return useFetchAsync(updateData);
};

export const useUpdatePassword = () => {
  const updateData = useCallback((password: string, newPassword: string) => {
    return post(`/users/update-password`, { password, newPassword });
  }, []);
  return useFetchAsync(updateData);
};
