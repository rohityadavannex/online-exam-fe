import { useSelector } from "react-redux";
import { useGet } from "src/http-clients/clients";
import { getCurrentUserInfo } from "src/redux/selectors/app";

export const useGetStudentExamResult = ({
  examId,
  studentId,
}: {
  examId: string;
  studentId: string;
}) => {
  const currentUser = useSelector(getCurrentUserInfo);
  console.log("line 13 --------> ", currentUser);
  return useGet(
    `/university/${currentUser.id}/exams/${examId}/${studentId}/result`
  );
};
