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

export const useAssignSubject = () => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePost(`/university/${uniData.userId}/subjects/create`);
};

export const useGetAssignedSubjects = ({
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
    `/university/${uniData.userId}/subjects${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

export const useUpdateAssignedSubject = ({
  subjectId,
}: {
  subjectId: number;
}) => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePatch(`/university/${uniData.userId}/subjects/edit/${subjectId}`);
};

export const useGetAssignedSubjectInfo = ({
  subjectId,
}: {
  subjectId: number;
}) => {
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(
    subjectId
      ? `/university/${uniData.userId}/subjects/${subjectId}`
      : undefined
  );
};

export const useDeleteAssignedSubject = () => {
  const uniData = useSelector(getCurrentUserInfo);
  const deleteFn = useCallback(
    (subjectId: number) => {
      return deleteReq(
        `/university/${uniData.userId}/subjects/delete/${subjectId}`
      );
    },
    [uniData.userId]
  );

  return useFetchAsync(deleteFn);
};

export const useUpdateSubjectStatus = () => {
  const uniData = useSelector(getCurrentUserInfo);
  const updateStatus = useCallback(
    ({ subjectId, data }: { subjectId: number; data: { status: boolean } }) => {
      return patch(
        `/university/${uniData.userId}/subjects/status/${subjectId}`,
        data
      );
    },
    [uniData.userId]
  );

  return useFetchAsync(updateStatus);
};
