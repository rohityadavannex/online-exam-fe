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

export const useCreateUser = () => {
  return usePost("/super-admin/users/create-user");
};

export const useGetUsers = ({
  length,
  page,
  search,
}: {
  length: number;
  page: number;
  search?: string;
}) => {
  const offset = page === 1 ? 0 : (page - 1) * length;
  const queryData = getQueryData({ length, offset, search });
  const data = useGet(`/super-admin/users/users-list${queryData}`);
  return data;
};

export const useGetUserData = (userId: number) => {
  return useGet(userId ? `/super-admin/users/user/${userId}` : null);
};

export const useUpdateUser = (userId: number) => {
  return usePatch(`/super-admin/users/user/${userId}`);
};

export const useUpdateUserStatus = () => {
  const handleStatusChange = useCallback((usersId: number, status: boolean) => {
    return patch(`/super-admin/users/user/${usersId}`, { status });
  }, []);
  return useFetchAsync(handleStatusChange);
};

export const useDeleteUser = () => {
  const deleteData = useCallback((userId: number) => {
    return deleteReq(`/super-admin/users/user/${userId}`);
  }, []);
  return useFetchAsync(deleteData);
};
