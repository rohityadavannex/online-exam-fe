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
import { getCurrentUserInfo } from "src/redux/selectors/app";
import SubjectType from "./list/types";

export const useCreateSubject = () => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePost(`/university/${uniData.userId}/subjects/create`);
};

export const useGetSubjects = ({
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

export const useUpdateSubject = ({ subjectId }: { subjectId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePatch(`/university/${uniData.userId}/subjects/edit/${subjectId}`);
};

export const useGetSubjectInfo = ({ subjectId }: { subjectId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(
    subjectId
      ? `/university/${uniData.userId}/subjects/${subjectId}`
      : undefined
  );
};

export const useDeleteSubject = () => {
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

export const useGetUniversitySubjects = () => {
  const uniData = useSelector(getCurrentUserInfo);
  const { data, ...rest } = useGet(`/university/${uniData.id}/subjects-list`);
  const subjectsOptions = useMemo(() => {
    return (data?.data?.rows ?? []).map((subject: SubjectType) => {
      return { label: subject.name, value: subject.id };
    });
  }, [data]);

  const getSubjectLabel = useCallback(
    (id: number) => {
      return (
        subjectsOptions.find(
          (subject: { label: string; value: number }) => subject.value === id
        )?.label ?? "-"
      );
    },
    [subjectsOptions]
  );

  return { ...rest, data: subjectsOptions, getSubjectLabel };
};
