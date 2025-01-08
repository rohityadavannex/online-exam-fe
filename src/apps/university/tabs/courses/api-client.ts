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

export const useCreateCourse = () => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePost(`/university/${uniData.userId}/courses/create`);
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
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(
    `/university/${uniData.userId}/courses${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

export const useUpdateCourse = ({ courseId }: { courseId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePatch(`/university/${uniData.userId}/courses/edit/${courseId}`);
};

export const useGetCourseInfo = ({ courseId }: { courseId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(
    courseId ? `/university/${uniData.userId}/courses/${courseId}` : undefined
  );
};

export const useDeleteCourse = () => {
  const uniData = useSelector(getCurrentUserInfo);
  const deleteFn = useCallback(
    (courseId: number) => {
      return deleteReq(
        `/university/${uniData.userId}/courses/delete/${courseId}`
      );
    },
    [uniData.userId]
  );

  return useFetchAsync(deleteFn);
};

export const useUpdateCourseStatus = () => {
  const uniData = useSelector(getCurrentUserInfo);
  const updateStatus = useCallback(
    ({ courseId, data }: { courseId: number; data: { status: boolean } }) => {
      return patch(
        `/university/${uniData.userId}/courses/status/${courseId}`,
        data
      );
    },
    [uniData.userId]
  );

  return useFetchAsync(updateStatus);
};

export const useGetUniversityCourses = () => {
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(`/university/${uniData.uniId}/courses-list`);
};
