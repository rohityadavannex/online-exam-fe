import dayjs from "dayjs";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import { useGetUniversityCourses } from "src/apps/university/tabs/courses/api-client";
import CourseType from "src/apps/university/tabs/courses/list/types";
import Button from "src/components/buttons/Button";
import DatePicker from "src/components/calendar/DatePicker";
import UploadImage from "src/components/image-upload/UploadImage";
import Input from "src/components/inputs/Input";
import Select from "src/components/select/Select";
import Toggle from "src/components/toggles/Toggle";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { GENDERS } from "src/utils/constants";
import { object, string } from "yup";
import {
  useCreateStudent,
  useGetStudentInfo,
  useUpdateStudent,
} from "./api-client";

enum FORM_FIELDS {
  NAME = "name",
  FATHER_NAME = "fatherName",
  MOTHER_NAME = "motherName",
  EMAIL = "email",
  PHONE = "phone",
  DEPARTMENT = "department",
  GENDER = "gender",
  AADHAR_CARD = "aadhar",
  COURSE = "course",
  ADDRESS = "address",
  LOGO = "logo",
  STATUS = "active",
  DOB = "dob",
  DOJ = "doj",
  MARKSHEET = "marksheet",
}

const CreateStudent = () => {
  useSetActiveTab(TAB_NAMES.STUDENT);
  const navigate = useNavigate();
  const { studentId } = useParams();
  const { errorNotification, successNotification } = useNotification();

  const { isLoading: isCourseLoading, data: coursesData } =
    useGetUniversityCourses();

  const coursesOptions = useMemo(() => {
    return (coursesData?.data?.rows ?? []).map((course: CourseType) => {
      return { label: course.name, value: course.id };
    });
  }, [coursesData]);

  const {
    isLoading: isCreateLoading,
    execute: executeCreate,
    isSuccess: isCreateSuccess,
    error: isCreateError,
  } = useCreateStudent();

  const {
    isLoading: isUpdateLoading,
    execute: executeUpdate,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdateStudent({ studentId: Number(studentId) });

  const { isLoading: isGetInfoLoading, data: response } = useGetStudentInfo({
    studentId: Number(studentId),
  });

  const initialData = useMemo(() => response?.data ?? {}, [response?.data]);

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.NAME]: initialData?.name ?? "",
        [FORM_FIELDS.FATHER_NAME]: initialData?.fatherName ?? "",
        [FORM_FIELDS.MOTHER_NAME]: initialData?.motherName ?? "",
        [FORM_FIELDS.EMAIL]: initialData?.email ?? "",
        [FORM_FIELDS.PHONE]: initialData?.phone ?? "",

        [FORM_FIELDS.DEPARTMENT]: initialData?.department ?? "",
        [FORM_FIELDS.DOB]: initialData?.dob ?? null,
        [FORM_FIELDS.DOJ]: initialData?.doj ?? null,
        [FORM_FIELDS.GENDER]: initialData?.gender ?? undefined,
        [FORM_FIELDS.AADHAR_CARD]: initialData?.aadhar ?? "",
        [FORM_FIELDS.ADDRESS]: initialData?.address ?? "",
        [FORM_FIELDS.LOGO]: initialData?.image ?? "",
        [FORM_FIELDS.STATUS]: initialData?.active ?? false,
        [FORM_FIELDS.COURSE]: initialData?.course ?? null,
        [FORM_FIELDS.MARKSHEET]: initialData?.marksheet ?? "",
      },
      validationSchema: object({
        [FORM_FIELDS.NAME]: string().required("This is a Required field."),
        [FORM_FIELDS.EMAIL]: string()
          .email()
          .required("This is a Required field."),
        [FORM_FIELDS.PHONE]: string().required("This is a Required field."),
      }),
      onSubmit: (values) => {
        console.log("Form submitted ", values);
        if (studentId) {
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
      navigate("/students");
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
      <TabHeader label="Add Student" />
      <div className="flex flex-col bg-white rounded-md py-[42px] px-[34px]">
        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Student Name"
              placeholder="Enter Student Name"
              name={FORM_FIELDS.NAME}
              value={values[FORM_FIELDS.NAME] as string}
              error={getFieldError(FORM_FIELDS.NAME)}
              onChange={handleChange}
              disabled={isUpdateLoading}
              required
            />

            <Input
              label="Student Email"
              placeholder="Enter Student Email"
              name={FORM_FIELDS.EMAIL}
              value={values[FORM_FIELDS.EMAIL] as string}
              error={getFieldError(FORM_FIELDS.EMAIL)}
              onChange={handleChange}
              disabled={isUpdateLoading}
              required
            />

            <Input
              type="number"
              label="Student Contact No."
              placeholder="Enter Student Contact No."
              name={FORM_FIELDS.PHONE}
              value={values[FORM_FIELDS.PHONE] as string}
              error={getFieldError(FORM_FIELDS.PHONE)}
              onChange={handleChange}
              disabled={isUpdateLoading}
              required
            />

            <Select
              label="Gender"
              showSearch
              placeholder="Gender"
              optionFilterProp="label"
              options={GENDERS}
              name={FORM_FIELDS.GENDER}
              value={values[FORM_FIELDS.GENDER] as string}
              error={errors[FORM_FIELDS.GENDER] as string}
              onChange={(val: string) =>
                setFieldValue(`${FORM_FIELDS.GENDER}`, val)
              }
            />

            <Input
              label="Father's Name"
              placeholder="Enter Student's Father Name"
              name={FORM_FIELDS.FATHER_NAME}
              value={values[FORM_FIELDS.FATHER_NAME] as string}
              error={getFieldError(FORM_FIELDS.FATHER_NAME)}
              onChange={handleChange}
              disabled={isUpdateLoading}
            />

            <Input
              label="Mother's Name"
              placeholder="Enter Student's Mother Name"
              name={FORM_FIELDS.MOTHER_NAME}
              value={values[FORM_FIELDS.MOTHER_NAME] as string}
              error={getFieldError(FORM_FIELDS.MOTHER_NAME)}
              onChange={handleChange}
              disabled={isUpdateLoading}
            />

            <Select
              label="Course"
              showSearch
              placeholder="Course"
              optionFilterProp="label"
              options={coursesOptions}
              name={FORM_FIELDS.COURSE}
              value={values[FORM_FIELDS.COURSE] as string}
              error={errors[FORM_FIELDS.COURSE] as string}
              onChange={(val: string) =>
                setFieldValue(`${FORM_FIELDS.COURSE}`, val)
              }
              loading={isCourseLoading}
            />

            <Input
              type="number"
              label="Aadhar Card No."
              placeholder="Enter Aadhar No."
              name={FORM_FIELDS.AADHAR_CARD}
              value={values[FORM_FIELDS.AADHAR_CARD] as string}
              error={getFieldError(FORM_FIELDS.AADHAR_CARD)}
              onChange={handleChange}
              disabled={isUpdateLoading}
            />

            <Input
              label="Department"
              placeholder="Enter Department"
              name={FORM_FIELDS.DEPARTMENT}
              value={values[FORM_FIELDS.DEPARTMENT] as string}
              error={getFieldError(FORM_FIELDS.DEPARTMENT)}
              onChange={handleChange}
              disabled={isUpdateLoading}
            />

            <DatePicker
              label="Date Of Birth"
              name={FORM_FIELDS.DOB}
              value={
                values[FORM_FIELDS.DOB] ? dayjs(values[FORM_FIELDS.DOB]) : null
              }
              error={getFieldError(FORM_FIELDS.DOB)}
              onChange={(value) => setFieldValue(FORM_FIELDS.DOB, value)}
              disabled={isUpdateLoading}
            />

            <DatePicker
              label="Date Of Joining"
              name={FORM_FIELDS.DOJ}
              value={
                values[FORM_FIELDS.DOJ] ? dayjs(values[FORM_FIELDS.DOJ]) : null
              }
              error={getFieldError(FORM_FIELDS.DOJ)}
              onChange={(value) => setFieldValue(FORM_FIELDS.DOJ, value)}
              disabled={isUpdateLoading}
            />

            <Input
              label="Address"
              placeholder="Enter Address"
              name={FORM_FIELDS.ADDRESS}
              value={values[FORM_FIELDS.ADDRESS] as string}
              error={getFieldError(FORM_FIELDS.ADDRESS)}
              onChange={handleChange}
              disabled={isUpdateLoading}
            />

            <Toggle
              label="Status"
              checked={values[FORM_FIELDS.STATUS] as boolean}
              onToggle={(val) => [setFieldValue(FORM_FIELDS.STATUS, val)]}
              showToggleStatus
            />

            <div className="flex flex-col md:flex-row gap-5">
              <UploadImage
                label="Student Image"
                error={getFieldError(FORM_FIELDS.LOGO)}
                value={values[FORM_FIELDS.LOGO] as unknown as string}
                onChange={(value) => setFieldValue(FORM_FIELDS.LOGO, value)}
              />

              <UploadImage
                label="12th Mark sheet"
                error={getFieldError(FORM_FIELDS.MARKSHEET)}
                value={values[FORM_FIELDS.MARKSHEET] as unknown as string}
                onChange={(value) =>
                  setFieldValue(FORM_FIELDS.MARKSHEET, value)
                }
              />
            </div>
          </div>

          <div className="flex items-center mt-6 gap-3">
            <Button
              className="min-w-24 h-12 rounded-lg"
              danger
              disabled={isUpdateLoading || isCreateLoading}
              onClick={() => navigate("/students")}
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

export default CreateStudent;
