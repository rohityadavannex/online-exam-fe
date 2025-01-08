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

export const useCreateAcademicYear = () => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePost(`/university/${uniData.id}/academic-years/create`);
};

export const useGetAcademicYears = ({
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
    `/university/${uniData.id}/academic-years${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

export const useUpdateAcademicYear = ({ yearId }: { yearId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return usePatch(`/university/${uniData.id}/academic-years/edit/${yearId}`);
};

export const useGetAcademicYearInfo = ({ yearId }: { yearId: number }) => {
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(
    yearId ? `/university/${uniData.id}/academic-years/${yearId}` : undefined
  );
};

export const useDeleteAcademicYear = () => {
  const uniData = useSelector(getCurrentUserInfo);
  const deleteFn = useCallback(
    (yearId: number) => {
      return deleteReq(
        `/university/${uniData.id}/academic-years/delete/${yearId}`
      );
    },
    [uniData.id]
  );

  return useFetchAsync(deleteFn);
};

export const useUpdateAcademicYearStatus = () => {
  const uniData = useSelector(getCurrentUserInfo);
  const updateStatus = useCallback(
    ({ yearId, data }: { yearId: number; data: { status: boolean } }) => {
      return patch(
        `/university/${uniData.id}/academic-years/status/${yearId}`,
        data
      );
    },
    [uniData.id]
  );

  return useFetchAsync(updateStatus);
};
