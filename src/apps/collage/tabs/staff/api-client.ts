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
  return usePost("/collage/staff/create");
};

export const useGetStaff = ({
  length,
  page,
  search = "",
}: {
  length: number;
  page: number;
  search?: string;
}) => {
  return useGet(`/collage/staff${getQueryData({ length, page, search })}`);
};

export const useUpdateStaff = ({ staffId }: { staffId: number }) => {
  return usePatch(`/collage/staff/edit/${staffId}`);
};

export const useDeleteSubject = () => {
  const deleteData = useCallback((subjectId: number) => {
    return deleteReq(null);
  }, []);
  return useFetchAsync(deleteData);
};

export const useGetStaffInfo = ({ staffId }: { staffId: number }) => {
  return useGet(staffId ? `/collage/staff/${staffId}` : undefined);
};

export const useDeleteStaff = () => {
  const deleteFn = useCallback((staffId: number) => {
    return deleteReq(`/collage/staff/delete/${staffId}`);
  }, []);

  return useFetchAsync(deleteFn);
};

export const useUpdateStaffStatus = () => {
  const updateStatus = useCallback(
    ({ staffId, data }: { staffId: number; data: { status: boolean } }) => {
      return patch(`/collage/staff/status/${staffId}`, data);
    },
    []
  );

  return useFetchAsync(updateStatus);
};
