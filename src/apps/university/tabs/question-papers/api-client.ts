import { useSelector } from "react-redux";
import { usePost } from "src/http-clients/clients";
import { getCurrentUserInfo } from "src/redux/selectors/app";

export const useCreateQuestionForExam = ({ examId }: { examId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePost(`/university/${uniData.id}/exams/${examId}/questions`);
};
