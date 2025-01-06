import { useCallback } from "react";
import useFetchAsync from "src/hooks/useFetchAsync";
import { get, patch, post } from "src/http-clients/clients";
import useSWR from "swr";

export type PermissionType = {
  id: number;
  roleId: number;
  moduleName: string;
};

export type RolesResponse = {
  id: number;
  name: string;
  active: boolean;
  permissions: PermissionType[];
};

export const useGetRoles = () => {
  return useSWR("/super-admin/roles/list", get);
};

export const useGetRoleAndPermission = (
  roleId: number,
  shouldFetch: boolean = true
) => {
  return useSWR(shouldFetch ? `/super-admin/roles/${roleId}` : null, get);
};

export const useCreateRoleAndPermission = () => {
  const create = useCallback((data: any) => {
    return post("/super-admin/roles/create", data);
  }, []);

  return useFetchAsync(create);
};

export const useUpdateRoleAndPermission = () => {
  const create = useCallback((data: any) => {
    return patch("/super-admin/roles/update", data);
  }, []);

  return useFetchAsync(create);
};
