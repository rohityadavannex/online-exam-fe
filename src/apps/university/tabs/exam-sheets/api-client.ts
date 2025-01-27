import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getQueryData } from "src/helpers/helpers";
import useFetchAsync from "src/hooks/useFetchAsync";
import { deleteReq, useGet, usePost } from "src/http-clients/clients";
import { getCurrentUserInfo } from "src/redux/selectors/app";

export const useCreateExamSheet = ({ examId }: { examId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePost(`/university/${uniData.userId}/exams/${examId}/exam-sheets`);
};

export const useGetExamSheets = ({
  examId,
  length,
  page,
  search = "",
}: {
  examId: number;
  length: number;
  page: number;
  search?: string;
}) => {
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(
    `/university/${uniData.userId}/exams/${examId}/exam-sheets${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

export const useDeleteExamSheet = ({ examId }: { examId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  const deleteFn = useCallback(
    (sheetId: number) => {
      return deleteReq(
        `/university/${uniData.userId}/exams/${examId}/exam-sheets/${sheetId}`
      );
    },
    [examId, uniData.userId]
  );

  return useFetchAsync(deleteFn);
};
