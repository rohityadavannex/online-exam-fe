import dayjs from "dayjs";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import Button from "src/components/buttons/Button";
import DatePicker from "src/components/calendar/DatePicker";
import Input from "src/components/inputs/Input";
import Toggle from "src/components/toggles/Toggle";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { object, string } from "yup";
import {
  useCreateAcademicYear,
  useGetAcademicYearInfo,
  useUpdateAcademicYear,
} from "./api-client";

enum FORM_FIELDS {
  START_YEAR = "startYear",
  END_YEAR = "endYear",
  NOTE = "note",
  STATUS = "status",
}

const CreateAcademicYear = () => {
  useSetActiveTab(TAB_NAMES.ACADEMIC_YEAR);
  const navigate = useNavigate();
  const { yearId } = useParams();
  const { errorNotification, successNotification } = useNotification();

  const {
    isLoading: isCreateLoading,
    execute: executeCreate,
    isSuccess: isCreateSuccess,
    error: isCreateError,
  } = useCreateAcademicYear();

  const {
    isLoading: isUpdateLoading,
    execute: executeUpdate,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdateAcademicYear({ yearId: Number(yearId) });

  const { isLoading: isGetInfoLoading, data: response } =
    useGetAcademicYearInfo({
      yearId: Number(yearId),
    });

  const initialData = useMemo(() => response?.data ?? {}, [response?.data]);

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.START_YEAR]: initialData?.startYear ?? null,
        [FORM_FIELDS.END_YEAR]: initialData?.endYear ?? null,
        [FORM_FIELDS.NOTE]: initialData?.note ?? "",
        [FORM_FIELDS.STATUS]: initialData?.active ?? false,
      },
      validationSchema: object({
        [FORM_FIELDS.START_YEAR]: string().required(
          "This is a Required field."
        ),
        [FORM_FIELDS.END_YEAR]: string().required("This is a Required field."),
      }),
      onSubmit: (values) => {
        console.log("Form submitted ", values);
        if (yearId) {
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
      navigate("/academic-years");
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
      <TabHeader label="Add Academic Year" />
      <div className="flex flex-col bg-white rounded-md py-[42px] px-[34px]">
        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label="Start Year"
              name={FORM_FIELDS.START_YEAR}
              value={
                values[FORM_FIELDS.START_YEAR]
                  ? dayjs(values[FORM_FIELDS.START_YEAR])
                  : null
              }
              error={getFieldError(FORM_FIELDS.START_YEAR)}
              onChange={(value, data) => {
                setFieldValue(FORM_FIELDS.START_YEAR, value);
              }}
              disabled={isUpdateLoading}
              picker="year"
              required
            />
            <DatePicker
              label="End Year"
              name={FORM_FIELDS.END_YEAR}
              value={
                values[FORM_FIELDS.END_YEAR]
                  ? dayjs(values[FORM_FIELDS.END_YEAR])
                  : null
              }
              error={getFieldError(FORM_FIELDS.END_YEAR)}
              onChange={(value, data) => {
                setFieldValue(FORM_FIELDS.END_YEAR, value);
              }}
              disabled={isUpdateLoading}
              picker="year"
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
              onClick={() => navigate("/academic-years")}
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

export default CreateAcademicYear;
