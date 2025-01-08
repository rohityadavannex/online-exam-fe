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

export const useCreateStudent = () => {
  return usePost("/collage/student/create");
};

export const useGetStudent = ({
  length,
  page,
  search = "",
}: {
  length: number;
  page: number;
  search?: string;
}) => {
  return useGet(`/collage/student${getQueryData({ length, page, search })}`);
};

export const useUpdateStudent = ({ studentId }: { studentId: number }) => {
  return usePatch(`/collage/student/edit/${studentId}`);
};

export const useDeleteSubject = () => {
  const deleteData = useCallback((subjectId: number) => {
    return deleteReq(null);
  }, []);
  return useFetchAsync(deleteData);
};

export const useGetStudentInfo = ({ studentId }: { studentId: number }) => {
  return useGet(studentId ? `/collage/student/${studentId}` : undefined);
};

export const useDeleteStudent = () => {
  const deleteFn = useCallback((studentId: number) => {
    return deleteReq(`/collage/student/delete/${studentId}`);
  }, []);

  return useFetchAsync(deleteFn);
};

export const useUpdateStudentStatus = () => {
  const updateStatus = useCallback(
    ({ studentId, data }: { studentId: number; data: { status: boolean } }) => {
      return patch(`/collage/student/status/${studentId}`, data);
    },
    []
  );

  return useFetchAsync(updateStatus);
};
