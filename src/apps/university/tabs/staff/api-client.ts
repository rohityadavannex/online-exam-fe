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

export const useCreateStaff = () => {
  return usePost("/university/staff/create");
};

export const useGetExaminers = ({
  length,
  page,
  search = "",
}: {
  length: number;
  page: number;
  search?: string;
}) => {
  return useGet(`/university/staff${getQueryData({ length, page, search })}`);
};

export const useUpdateStaff = ({ staffId }: { staffId: number }) => {
  return usePatch(`/university/staff/edit/${staffId}`);
};

export const useGetStaffInfo = ({ staffId }: { staffId: number }) => {
  return useGet(staffId ? `/university/staff/${staffId}` : undefined);
};

export const useDeleteStaff = () => {
  const deleteFn = useCallback((staffId: number) => {
    return deleteReq(`/university/staff/delete/${staffId}`);
  }, []);

  return useFetchAsync(deleteFn);
};

export const useUpdateStaffStatus = () => {
  const updateStatus = useCallback(
    ({ staffId, data }: { staffId: number; data: { status: boolean } }) => {
      return patch(`/university/staff/status/${staffId}`, data);
    },
    []
  );

  return useFetchAsync(updateStatus);
};
