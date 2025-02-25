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
import SubjectType from "./list/types";

export const useCreateSubject = () => {
  const uniId = useSelector(getUniId);
  return usePost(`/university/${uniId}/subjects/create`);
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
  const uniId = useSelector(getUniId);
  return useGet(
    `/university/${uniId}/subjects${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

export const useUpdateSubject = ({ subjectId }: { subjectId: number }) => {
  const uniId = useSelector(getUniId);
  return usePatch(`/university/${uniId}/subjects/edit/${subjectId}`);
};

export const useGetSubjectInfo = ({ subjectId }: { subjectId: number }) => {
  const uniId = useSelector(getUniId);
  return useGet(
    subjectId ? `/university/${uniId}/subjects/${subjectId}` : undefined
  );
};

export const useDeleteSubject = () => {
  const uniId = useSelector(getUniId);
  const deleteFn = useCallback(
    (subjectId: number) => {
      return deleteReq(`/university/${uniId}/subjects/delete/${subjectId}`);
    },
    [uniId]
  );

  return useFetchAsync(deleteFn);
};

export const useUpdateSubjectStatus = () => {
  const uniId = useSelector(getUniId);
  const updateStatus = useCallback(
    ({ subjectId, data }: { subjectId: number; data: { status: boolean } }) => {
      return patch(`/university/${uniId}/subjects/status/${subjectId}`, data);
    },
    [uniId]
  );

  return useFetchAsync(updateStatus);
};

export const useGetUniversitySubjects = (universityId?: number) => {
  const uniId = useSelector(getUniId);
  const { data, ...rest } = useGet(
    `/university/${universityId ?? uniId}/subjects-list`
  );
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
