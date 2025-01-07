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
  return usePost("/university/collages/create");
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
  return useGet(
    `/university/collages${getQueryData({ length, page, search })}`
  );
};

export const useUpdateStaff = ({ staffId }: { staffId: number }) => {
  return usePatch(`/university/collages/edit/${staffId}`);
};

export const useDeleteSubject = () => {
  const deleteData = useCallback((subjectId: number) => {
    return deleteReq(null);
  }, []);
  return useFetchAsync(deleteData);
};

export const useGetStaffInfo = ({ staffId }: { staffId: number }) => {
  return useGet(`/university/collage/${staffId}`);
};

export const useDeleteStaff = () => {
  const deleteFn = useCallback((staffId: number) => {
    return deleteReq(`/university/collages/delete/${staffId}`);
  }, []);

  return useFetchAsync(deleteFn);
};

export const useUpdateStaffStatus = () => {
  const updateStatus = useCallback(
    ({ staffId, data }: { staffId: number; data: { status: boolean } }) => {
      return patch(`/university/collage/status/${staffId}`, data);
    },
    []
  );

  return useFetchAsync(updateStatus);
};
