import { getQueryData } from "src/helpers/helpers";
import { useGet } from "src/http-clients/clients";

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
