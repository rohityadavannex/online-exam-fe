import { useCallback } from "react";
import useFetchAsync from "src/hooks/useFetchAsync";
import { patch } from "src/http-clients/clients";

export const useUpdateUserProfile = () => {
  const updateData = useCallback((name: string | number) => {
    return patch(`/users/user-info`, { name });
  }, []);
  return useFetchAsync(updateData);
};
