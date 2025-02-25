import dayjs from "dayjs";
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
import AcademicYearType from "./list/types";

export const useCreateAcademicYear = () => {
  const uniId = useSelector(getUniId);
  return usePost(`/university/${uniId}/academic-years/create`);
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
  const uniId = useSelector(getUniId);
  return useGet(
    `/university/${uniId}/academic-years${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

export const useUpdateAcademicYear = ({ yearId }: { yearId: number }) => {
  const uniId = useSelector(getUniId);
  return usePatch(`/university/${uniId}/academic-years/edit/${yearId}`);
};

export const useGetAcademicYearInfo = ({ yearId }: { yearId: number }) => {
  const uniId = useSelector(getUniId);
  return useGet(
    yearId ? `/university/${uniId}/academic-years/${yearId}` : undefined
  );
};

export const useDeleteAcademicYear = () => {
  const uniId = useSelector(getUniId);
  const deleteFn = useCallback(
    (yearId: number) => {
      return deleteReq(`/university/${uniId}/academic-years/delete/${yearId}`);
    },
    [uniId]
  );

  return useFetchAsync(deleteFn);
};

export const useUpdateAcademicYearStatus = () => {
  const uniId = useSelector(getUniId);
  const updateStatus = useCallback(
    ({ yearId, data }: { yearId: number; data: { status: boolean } }) => {
      return patch(
        `/university/${uniId}/academic-years/status/${yearId}`,
        data
      );
    },
    [uniId]
  );

  return useFetchAsync(updateStatus);
};

export const useGetUniversityAcademicYears = () => {
  const uniId = useSelector(getUniId);
  const { data, ...rest } = useGet(`/university/${uniId}/academic-years-list`);
  const mappedAcademicYearsData = useMemo(() => {
    return (data?.data?.rows ?? []).map((item: AcademicYearType) => {
      return {
        value: item.id,
        label: `${dayjs(item.startYear).format("YYYY")}-${dayjs(
          item.endYear
        ).format("YYYY")}`,
      };
    });
  }, [data?.data?.rows]);

  const getLabel = useCallback(
    (id: number) => {
      return (
        mappedAcademicYearsData.find(
          (course: { label: string; value: number }) => course.value === id
        )?.label ?? "-"
      );
    },
    [mappedAcademicYearsData]
  );

  return { ...rest, data: mappedAcademicYearsData, getLabel };
};
