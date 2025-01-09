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
import { getCurrentUserInfo } from "src/redux/selectors/app";

export const useCreateExam = () => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePost(`/university/${uniData.id}/academic-years/create`);
};

export const useGetExamsList = ({
  length,
  page,
  search = "",
}: {
  length: number;
  page: number;
  search?: string;
}) => {
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(
    `/university/${uniData.id}/academic-years${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

export const useUpdateExam = ({ examId }: { examId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePatch(`/university/${uniData.id}/academic-years/edit/${examId}`);
};

export const useGetExamInfo = ({ examId }: { examId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(
    examId ? `/university/${uniData.id}/academic-years/${examId}` : undefined
  );
};

export const useDeleteExam = () => {
  const uniData = useSelector(getCurrentUserInfo);
  const deleteFn = useCallback(
    (examId: number) => {
      return deleteReq(
        `/university/${uniData.id}/academic-years/delete/${examId}`
      );
    },
    [uniData.id]
  );

  return useFetchAsync(deleteFn);
};

export const useUpdateExamStatus = () => {
  const uniData = useSelector(getCurrentUserInfo);
  const updateStatus = useCallback(
    ({ examId, data }: { examId: number; data: { status: boolean } }) => {
      return patch(
        `/university/${uniData.id}/academic-years/status/${examId}`,
        data
      );
    },
    [uniData.id]
  );

  return useFetchAsync(updateStatus);
};
