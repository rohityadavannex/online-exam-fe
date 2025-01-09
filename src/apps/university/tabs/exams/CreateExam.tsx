import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import Button from "src/components/buttons/Button";
import Input from "src/components/inputs/Input";
import Select from "src/components/select/Select";
import Toggle from "src/components/toggles/Toggle";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { EXAM_TYPE_OPTIONS, SEMESTER_OPTIONS } from "src/utils/constants";
import { object, string } from "yup";
import { useGetUniversityAcademicYears } from "../academic-years/api-client";
import { useGetUniversityCourses } from "../courses/api-client";
import { useCreateExam, useGetExamInfo, useUpdateExam } from "./api-client";

enum FORM_FIELDS {
  EXAM_NAME = "name",
  ACADEMIC_YEAR = "ACADEMIC_YEAR",
  COURSE = "course",
  SEMESTER = "semester",
  EXAM_TYPE = "examType",
  NOTE = "note",
  STATUS = "status",
}

const CreateExam = () => {
  useSetActiveTab(TAB_NAMES.EXAM);
  const navigate = useNavigate();
  const { examId } = useParams();
  const { errorNotification, successNotification } = useNotification();

  const { isLoading: isGetAcademicYearsLoading, data: academicYearData } =
    useGetUniversityAcademicYears();
  const { isLoading: isGetCoursesLoading, data: coursesData } =
    useGetUniversityCourses();

  const {
    isLoading: isCreateLoading,
    execute: executeCreate,
    isSuccess: isCreateSuccess,
    error: isCreateError,
  } = useCreateExam();

  const {
    isLoading: isUpdateLoading,
    execute: executeUpdate,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdateExam({ examId: Number(examId) });

  const { isLoading: isGetInfoLoading, data: response } = useGetExamInfo({
    examId: Number(examId),
  });

  const initialData = useMemo(() => response?.data ?? {}, [response?.data]);

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.EXAM_NAME]: initialData?.name ?? "",
        [FORM_FIELDS.COURSE]: initialData?.course ?? null,
        [FORM_FIELDS.ACADEMIC_YEAR]: initialData?.academicYear ?? null,
        [FORM_FIELDS.SEMESTER]: initialData?.semester ?? null,
        [FORM_FIELDS.EXAM_TYPE]: initialData?.examType ?? null,
        [FORM_FIELDS.NOTE]: initialData?.note ?? "",
        [FORM_FIELDS.STATUS]: initialData?.active ?? false,
      },
      validationSchema: object({
        [FORM_FIELDS.EXAM_NAME]: string().required("This is a Required field."),
        [FORM_FIELDS.COURSE]: string().required("This is a Required field."),
        [FORM_FIELDS.ACADEMIC_YEAR]: string().required(
          "This is a Required field."
        ),
        [FORM_FIELDS.SEMESTER]: string().required("This is a Required field."),
        [FORM_FIELDS.EXAM_TYPE]: string().required("This is a Required field."),
      }),
      onSubmit: (values) => {
        console.log("Form submitted ", values);
        if (examId) {
          executeUpdate(values);
          return;
        }
        executeCreate(values);
      },
    });

  const getFieldError = useCallback(
    (fieldName: FORM_FIELDS) => {
      return touched[fieldName] ? (errors[fieldName] as string) : undefined;
    },
    [errors, touched]
  );

  useEffect(() => {
    if (isCreateSuccess) {
      successNotification();
      navigate("/exams");
    }
    if (isCreateError) {
      errorNotification();
    }
  }, [
    errorNotification,
    isCreateError,
    isCreateSuccess,
    navigate,
    successNotification,
  ]);

  useEffect(() => {
    if (isUpdateSuccess) {
      successNotification();
    }
    if (isUpdateError) {
      errorNotification();
    }
  }, [errorNotification, isUpdateError, isUpdateSuccess, successNotification]);

  return (
    <div className="flex flex-col gap-6">
      <TabHeader label="Add Exam" />
      <div className="flex flex-col bg-white rounded-md py-[42px] px-[34px]">
        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Exam Name"
              placeholder="Enter Exam Name"
              name={FORM_FIELDS.EXAM_NAME}
              value={values[FORM_FIELDS.EXAM_NAME] as string}
              error={getFieldError(FORM_FIELDS.EXAM_NAME)}
              onChange={handleChange}
              disabled={isUpdateLoading}
              required
            />
            <Select
              label="Academic Year"
              showSearch
              placeholder="Select Academic Year"
              optionFilterProp="label"
              options={academicYearData}
              name={FORM_FIELDS.ACADEMIC_YEAR}
              value={values[FORM_FIELDS.ACADEMIC_YEAR] as string}
              error={errors[FORM_FIELDS.ACADEMIC_YEAR] as string}
              onChange={(val: string) =>
                setFieldValue(`${FORM_FIELDS.ACADEMIC_YEAR}`, val)
              }
              loading={isGetAcademicYearsLoading}
              required
            />

            <Select
              label="Course"
              showSearch
              placeholder="Select Course"
              optionFilterProp="label"
              options={coursesData}
              name={FORM_FIELDS.COURSE}
              value={values[FORM_FIELDS.COURSE] as string}
              error={errors[FORM_FIELDS.COURSE] as string}
              onChange={(val: string) =>
                setFieldValue(`${FORM_FIELDS.COURSE}`, val)
              }
              loading={isGetAcademicYearsLoading}
              required
            />

            <Select
              label="Semester"
              showSearch
              placeholder="Select Semester"
              optionFilterProp="label"
              options={SEMESTER_OPTIONS}
              name={FORM_FIELDS.SEMESTER}
              value={values[FORM_FIELDS.SEMESTER] as string}
              error={errors[FORM_FIELDS.SEMESTER] as string}
              onChange={(val: string) =>
                setFieldValue(`${FORM_FIELDS.SEMESTER}`, val)
              }
              loading={isGetAcademicYearsLoading}
              required
            />

            <Select
              label="Exam Type"
              showSearch
              placeholder="Select Exam type"
              optionFilterProp="label"
              options={EXAM_TYPE_OPTIONS}
              name={FORM_FIELDS.EXAM_TYPE}
              value={values[FORM_FIELDS.EXAM_TYPE] as string}
              error={errors[FORM_FIELDS.EXAM_TYPE] as string}
              onChange={(val: string) =>
                setFieldValue(`${FORM_FIELDS.EXAM_TYPE}`, val)
              }
              loading={isGetAcademicYearsLoading}
              required
            />

            <Input
              label="Note"
              placeholder="Note"
              name={FORM_FIELDS.NOTE}
              value={values[FORM_FIELDS.NOTE] as string}
              error={getFieldError(FORM_FIELDS.NOTE)}
              onChange={handleChange}
              disabled={isUpdateLoading}
            />

            <Toggle
              label="Status"
              checked={values[FORM_FIELDS.STATUS] as boolean}
              onToggle={(val) => [setFieldValue(FORM_FIELDS.STATUS, val)]}
              showToggleStatus
            />
          </div>

          <div className="flex items-center mt-6 gap-3">
            <Button
              className="min-w-24 h-12 rounded-lg"
              danger
              disabled={isUpdateLoading || isCreateLoading}
              onClick={() => navigate("/exams")}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="min-w-24 h-12 rounded-lg"
              htmlType="submit"
              disabled={isUpdateLoading || isCreateLoading}
              loading={isUpdateLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
