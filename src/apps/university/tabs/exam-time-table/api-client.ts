import { useCallback } from "react";
import { useSelector } from "react-redux";
import useFetchAsync from "src/hooks/useFetchAsync";
import { deleteReq, useGet, usePost } from "src/http-clients/clients";
import { getCurrentUserInfo } from "src/redux/selectors/app";

export const useGetAllCollegesList = ({ examId }: { examId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(`/university/${uniData.userId}/exams/${examId}/colleges`);
};

export const useCreateExamCenter = ({ examId }: { examId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePost(`/university/${uniData.userId}/exams/${examId}/time-table`);
};

export const useGetAllExamCenters = ({ examId }: { examId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(`/university/${uniData.userId}/exams/${examId}/time-table`);
};

export const useDeleteExamCenter = ({
  examId,
  centerId,
}: {
  examId: number;
  centerId: number;
}) => {
  const uniData = useSelector(getCurrentUserInfo);
  const deleteFn = useCallback(
    (subjectId: number) => {
      return deleteReq(
        `/university/${uniData.userId}/exams/${examId}/time-table/${centerId}`
      );
    },
    [centerId, examId, uniData.userId]
  );

  return useFetchAsync(deleteFn);
};

export const useStartExamCenterAllotment = ({ examId }: { examId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePost(
    `/university/${uniData.userId}/exams/${examId}/allot-time-table`
  );
};
