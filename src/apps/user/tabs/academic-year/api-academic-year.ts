import { useCallback } from "react";
import useFetchAsync from "src/hooks/useFetchAsync";
import { deleteReq, useGet, usePatch } from "src/http-clients/clients";

export const useGetAcademicYears = ({
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

export const useUpdateAcademicYear = () => {
  return usePatch(null);
};

export const useDeleteAcademicYear = () => {
  const deleteData = useCallback((academicYearId: number) => {
    return deleteReq(null);
  }, []);
  return useFetchAsync(deleteData);
};
