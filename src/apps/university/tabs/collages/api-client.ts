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
import { getUniId } from "src/redux/selectors/app";

export const useCreateCollage = () => {
  const uniId = useSelector(getUniId);
  return usePost(`/university/${uniId}/collages/create`);
};

export const useGetCollages = ({
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
    `/university/${uniId}/collages${getQueryData({ length, page, search })}`
  );
};

export const useUpdateCollage = ({ collageId }: { collageId: number }) => {
  const uniId = useSelector(getUniId);
  return usePatch(`/university/${uniId}/collages/edit/${collageId}`);
};

export const useDeleteSubject = () => {
  const uniId = useSelector(getUniId);
  const deleteData = useCallback((subjectId: number) => {
    return deleteReq(null);
  }, []);
  return useFetchAsync(deleteData);
};

export const useGetCollageInfo = ({ collageId }: { collageId: number }) => {
  const uniId = useSelector(getUniId);
  return useGet(
    collageId ? `/university/${uniId}/collage/${collageId}` : undefined
  );
};

export const useDeleteCollage = () => {
  const uniId = useSelector(getUniId);
  const deleteFn = useCallback(
    (collageId: number) => {
      return deleteReq(`/university/${uniId}/collages/delete/${collageId}`);
    },
    [uniId]
  );

  return useFetchAsync(deleteFn);
};

export const useUpdateCollageStatus = () => {
  const uniId = useSelector(getUniId);
  const updateStatus = useCallback(
    ({ collageId, data }: { collageId: number; data: { status: boolean } }) => {
      return patch(`/university/${uniId}/collage/status/${collageId}`, data);
    },
    [uniId]
  );

  return useFetchAsync(updateStatus);
};
