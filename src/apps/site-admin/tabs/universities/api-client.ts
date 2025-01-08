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

export const useCreateUniversity = () => {
  return usePost("/site-admin/universities/create");
};

export const useGetUniversities = ({
  length,
  page,
  search = "",
}: {
  length: number;
  page: number;
  search?: string;
}) => {
  return useGet(
    `/site-admin/universities${getQueryData({ length, page, search })}`
  );
};

export const useUpdateUniversity = ({ uniId }: { uniId: number }) => {
  return usePatch(`/site-admin/universities/edit/${uniId}`);
};

export const useDeleteSubject = () => {
  const deleteData = useCallback((subjectId: number) => {
    return deleteReq(null);
  }, []);
  return useFetchAsync(deleteData);
};

export const useGetUniversityInfo = ({ uniId }: { uniId: number }) => {
  return useGet(uniId ? `/site-admin/university/${uniId}` : undefined);
};

export const useDeleteUniversity = () => {
  const deleteUni = useCallback((uniId: number) => {
    return deleteReq(`/site-admin/universities/delete/${uniId}`);
  }, []);

  return useFetchAsync(deleteUni);
};

export const useUpdateUniversityStatus = () => {
  const updateUniStatus = useCallback(
    ({ uniId, data }: { uniId: number; data: { status: boolean } }) => {
      return patch(`/site-admin/university/status/${uniId}`, data);
    },
    []
  );

  return useFetchAsync(updateUniStatus);
};
