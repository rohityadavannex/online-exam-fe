import { useSelector } from "react-redux";
import { getQueryData } from "src/helpers/helpers";
import { useGet, usePatch } from "src/http-clients/clients";
import { getCurrentUserInfo } from "src/redux/selectors/app";

export const useGetExamEnrolledStudent = ({
  length,
  page,
  search = "",
  examId,
}: {
  length: number;
  page: number;
  search?: string;
  examId: number;
}) => {
  const currentUser = useSelector(getCurrentUserInfo);
  return useGet(
    `/university/${
      currentUser.id
    }/exams/${examId}/enrolled-students${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

export const useUpdateExamEnrolledStatus = ({
  length,
  page,
  search = "",
  examId,
}: {
  length: number;
  page: number;
  search?: string;
  examId: number;
}) => {
  const currentUser = useSelector(getCurrentUserInfo);
  return usePatch(
    `/university/${
      currentUser.id
    }/exams/${examId}/enrolled-students${getQueryData({
      length,
      page,
      search,
    })}`
  );
};
