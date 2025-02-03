import { useCallback, useMemo } from "react";
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
import CourseType from "./list/types";

export const useCreateCourse = () => {
  const uniId = useSelector(getUniId);
  return usePost(`/university/${uniId}/courses/create`);
};

export const useGetCourses = ({
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
    `/university/${uniId}/courses${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

export const useUpdateCourse = ({ courseId }: { courseId: number }) => {
  const uniId = useSelector(getUniId);
  return usePatch(`/university/${uniId}/courses/edit/${courseId}`);
};

export const useGetCourseInfo = ({ courseId }: { courseId: number }) => {
  const uniId = useSelector(getUniId);
  return useGet(
    courseId ? `/university/${uniId}/courses/${courseId}` : undefined
  );
};

export const useDeleteCourse = () => {
  const uniId = useSelector(getUniId);
  const deleteFn = useCallback(
    (courseId: number) => {
      return deleteReq(`/university/${uniId}/courses/delete/${courseId}`);
    },
    [uniId]
  );

  return useFetchAsync(deleteFn);
};

export const useUpdateCourseStatus = () => {
  const uniId = useSelector(getUniId);
  const updateStatus = useCallback(
    ({ courseId, data }: { courseId: number; data: { status: boolean } }) => {
      return patch(`/university/${uniId}/courses/status/${courseId}`, data);
    },
    [uniId]
  );

  return useFetchAsync(updateStatus);
};

export const useGetUniversityCourses = () => {
  const uniId = useSelector(getUniId);

  const { data, ...rest } = useGet(`/university/${uniId}/courses-list`);
  const coursesOptions = useMemo(() => {
    return (data?.data?.rows ?? []).map((course: CourseType) => {
      return { label: course.name, value: course.id };
    });
  }, [data]);

  const getCourseLabel = useCallback(
    (id: number) => {
      return (
        coursesOptions.find(
          (course: { label: string; value: number }) => course.value === id
        )?.label ?? "-"
      );
    },
    [coursesOptions]
  );

  return { ...rest, data: coursesOptions, getCourseLabel };
};
