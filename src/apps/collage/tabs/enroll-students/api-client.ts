import { getQueryData } from "src/helpers/helpers";
import { useGet, usePost } from "src/http-clients/clients";

export const useGetCourseStudent = ({
  length,
  page,
  search = "",
  courseId,
}: {
  length: number;
  page: number;
  search?: string;
  courseId: number;
}) => {
  return useGet(
    `/collage/course/${courseId}/students${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

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
    `/collage/exams/${examId}/enrolled-students${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

export const useCreateEnrollment = () => {
  return usePost(`/collage/exams/enroll-students`);
};
