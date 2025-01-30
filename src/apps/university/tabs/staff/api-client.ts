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

export const useCreateExaminer = () => {
  return usePost("/university/examiner/create");
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
  return useGet(
    `/university/examiner${getQueryData({ length, page, search })}`
  );
};

export const useUpdateExaminer = ({ examinerId }: { examinerId: number }) => {
  return usePatch(`/university/examiner/edit/${examinerId}`);
};

export const useGetExaminerInfo = ({ examinerId }: { examinerId: number }) => {
  return useGet(examinerId ? `/university/examiner/${examinerId}` : undefined);
};

export const useDeleteExaminer = () => {
  const deleteFn = useCallback((examinerId: number) => {
    return deleteReq(`/university/examiner/delete/${examinerId}`);
  }, []);

  return useFetchAsync(deleteFn);
};

export const useUpdateExaminerStatus = () => {
  const updateStatus = useCallback(
    ({
      examinerId,
      data,
    }: {
      examinerId: number;
      data: { status: boolean };
    }) => {
      return patch(`/university/examiner/status/${examinerId}`, data);
    },
    []
  );

  return useFetchAsync(updateStatus);
};
