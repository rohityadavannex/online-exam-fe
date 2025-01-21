import { getQueryData } from "src/helpers/helpers";
import { useGet } from "src/http-clients/clients";

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
  return useGet(
    `/university/exams/${examId}/enrolled-students${getQueryData({
      length,
      page,
      search,
    })}`
  );
};
