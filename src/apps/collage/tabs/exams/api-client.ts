import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import AcademicYearType from "src/apps/university/tabs/academic-years/list/types";
import CourseType from "src/apps/university/tabs/courses/list/types";
import { getQueryData } from "src/helpers/helpers";
import { useGet } from "src/http-clients/clients";
import { getCurrentUserInfo } from "src/redux/selectors/app";

export const useGetExamsList = ({
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
    `/university/${uniData.uniId}/exams${getQueryData({
      length,
      page,
      search,
    })}`
  );
};

export const useGetUniversityAcademicYears = () => {
  const uniData = useSelector(getCurrentUserInfo);
  const { data, ...rest } = useGet(
    `/university/${uniData.uniId}/academic-years-list`
  );
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

export const useGetUniversityCourses = () => {
  const uniData = useSelector(getCurrentUserInfo);
  const { data, ...rest } = useGet(`/university/${uniData.uniId}/courses-list`);
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
