import { useCallback } from "react";
import useFetchAsync from "src/hooks/useFetchAsync";
import { deleteReq, useGet, usePatch } from "src/http-clients/clients";

export const useGetSubjects = ({
  length,
  page,
  search,
}: {
  length: number;
  page: number;
  search?: string;
}) => {
  return useGet(null);
};

export const useUpdateSection = () => {
  return usePatch(null);
};

export const useDeleteSubject = () => {
  const deleteData = useCallback((subjectId: number) => {
    return deleteReq(null);
  }, []);
  return useFetchAsync(deleteData);
};
