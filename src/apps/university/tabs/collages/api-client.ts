import { useCallback } from "react";
import { getQueryData } from "src/helpers/helpers";
import useFetchAsync from "src/hooks/useFetchAsync";
import {
  deleteReq,
  patch,
  useGet,
  usePatch,
  usePost,
} from "src/http-clients/clients";

export const useCreateCollage = () => {
  return usePost("/university/collages/create");
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
  return useGet(
    `/university/collages${getQueryData({ length, page, search })}`
  );
};

export const useUpdateCollage = ({ collageId }: { collageId: number }) => {
  return usePatch(`/university/collages/edit/${collageId}`);
};

export const useDeleteSubject = () => {
  const deleteData = useCallback((subjectId: number) => {
    return deleteReq(null);
  }, []);
  return useFetchAsync(deleteData);
};

export const useGetCollageInfo = ({ collageId }: { collageId: number }) => {
  return useGet(`/university/collage/${collageId}`);
};

export const useDeleteCollage = () => {
  const deleteFn = useCallback((collageId: number) => {
    return deleteReq(`/university/collages/delete/${collageId}`);
  }, []);

  return useFetchAsync(deleteFn);
};

export const useUpdateCollageStatus = () => {
  const updateStatus = useCallback(
    ({ collageId, data }: { collageId: number; data: { status: boolean } }) => {
      return patch(`/university/collage/status/${collageId}`, data);
    },
    []
  );

  return useFetchAsync(updateStatus);
};
