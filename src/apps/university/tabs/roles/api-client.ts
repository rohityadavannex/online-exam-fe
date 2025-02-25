import { useCallback } from "react";
import { getQueryData } from "src/helpers/helpers";
import useFetchAsync from "src/hooks/useFetchAsync";
import {
  deleteReq,
  patch,
  useGet,
  usePatch,
  usePost,
} from "src/http-clients/clients";

export const useCreateRole = () => {
  return usePost("/super-admin/roles/create-role");
};

export const useGetRoles = ({
  length,
  page,
  search,
}: {
  length?: number;
  page?: number;
  search?: string;
}) => {
  let queryData = {};
  if (page && length) {
    const offset = page === 1 ? 0 : (page - 1) * length;
    queryData = { length, offset, search };
  }

  const data = useGet(
    `/super-admin/roles/roles-list${getQueryData(queryData)}`
  );
  return data;
};

export const useGetRoleData = (roleId: number) => {
  return useGet(roleId ? `/super-admin/roles/role/${roleId}` : null);
};

export const useUpdateRole = (userId: number) => {
  return usePatch(`/super-admin/roles/role/${userId}`);
};

export const useUpdateRoleStatus = () => {
  const handleStatusChange = useCallback((roleId: number, status: boolean) => {
    return patch(`/super-admin/roles/role/status/${roleId}`, { status });
  }, []);
  return useFetchAsync(handleStatusChange);
};

export const useDeleteRole = () => {
  const deleteData = useCallback((roleId: number) => {
    return deleteReq(`/super-admin/roles/role/${roleId}`);
  }, []);
  return useFetchAsync(deleteData);
};
