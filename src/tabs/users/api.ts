import { useCallback } from "react";
import useFetchAsync from "src/hooks/useFetchAsync";
import { get, patch, post } from "src/http-clients/clients";
import useSWR from "swr";

export type UsersResponse = {
  id: number;
  name: string;
  active: boolean;
};

export const useGetUsers = () => {
  return useSWR("/super-admin/users/list", get);
};

export const useGetUserInfo = (orgId: number) => {
  return useSWR(orgId ? `/super-admin/users/${orgId}` : null, get);
};

export const useCreateUser = () => {
  const create = useCallback((data: any) => {
    return post("/super-admin/users/create", data);
  }, []);

  return useFetchAsync(create);
};

export const useUpdateUser = () => {
  const create = useCallback((data: any) => {
    return patch("/super-admin/users/update", data);
  }, []);

  return useFetchAsync(create);
};
