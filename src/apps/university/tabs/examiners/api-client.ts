import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getQueryData } from "src/helpers/helpers";
import useFetchAsync from "src/hooks/useFetchAsync";
import {
  deleteReq,
  patch,
  useGet,
  usePatch,
  usePost,
} from "src/http-clients/clients";
import { getUniId } from "src/redux/selectors/app";

export const useCreateExaminer = () => {
  const uniId = useSelector(getUniId);
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
  const uniId = useSelector(getUniId);
  return useGet(
    `/university/${uniId}/examiner${getQueryData({ length, page, search })}`
  );
};

export const useUpdateExaminer = ({ examinerId }: { examinerId: number }) => {
  const uniId = useSelector(getUniId);
  return usePatch(`/university/${uniId}/examiner/edit/${examinerId}`);
};

export const useGetExaminerInfo = ({ examinerId }: { examinerId: number }) => {
  const uniId = useSelector(getUniId);
  return useGet(
    examinerId ? `/university/${uniId}/examiner/${examinerId}` : undefined
  );
};

export const useDeleteExaminer = () => {
  const uniId = useSelector(getUniId);
  const deleteFn = useCallback(
    (examinerId: number) => {
      return deleteReq(`/university/${uniId}/examiner/delete/${examinerId}`);
    },
    [uniId]
  );

  return useFetchAsync(deleteFn);
};

export const useUpdateExaminerStatus = () => {
  const uniId = useSelector(getUniId);
  const updateStatus = useCallback(
    ({
      examinerId,
      data,
    }: {
      examinerId: number;
      data: { status: boolean };
    }) => {
      return patch(`/university/${uniId}/examiner/status/${examinerId}`, data);
    },
    [uniId]
  );

  return useFetchAsync(updateStatus);
};
