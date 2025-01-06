import dayjs from "dayjs";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import Button from "src/components/buttons/Button";
import DatePicker from "src/components/calendar/DatePicker";
import Input from "src/components/inputs/Input";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { object, string } from "yup";
import { useUpdateAcademicYear } from "./api-academic-year";

enum FORM_FIELDS {
  SESSION_START = "sessionStart",
  SESSION_END = "sessionEnd",
  NOTE = "note",
}

const CreateAcademicYear = () => {
  useSetActiveTab(TAB_NAMES.ACADEMIC_YEAR);
  const { academicYearId } = useParams();
  const { errorNotification, successNotification } = useNotification();
  const {
    isLoading: isUpdateLoading,
    execute: updateAcademicYear,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdateAcademicYear();

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    resetForm,
    setFieldValue,
    touched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      [FORM_FIELDS.SESSION_START]: "",
      [FORM_FIELDS.SESSION_END]: "",
      [FORM_FIELDS.NOTE]: "",
    },
    validationSchema: object({
      [FORM_FIELDS.SESSION_START]: string().required(
        "This is a Required field."
      ),
      [FORM_FIELDS.SESSION_END]: string().required("This is a Required field."),
    }),
    onSubmit: (values) => {
      console.log("Form submitted ", values);
      //updateSection();
    },
  });

  const getFieldError = useCallback(
    (fieldName: FORM_FIELDS) => {
      return touched[fieldName] ? (errors[fieldName] as string) : undefined;
    },
    [errors, touched]
  );

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
              label="Session Start"
              className="h-[46px]"
              placeholder="Enter Session Start"
              picker="month"
              name={FORM_FIELDS.SESSION_START}
              error={getFieldError(FORM_FIELDS.SESSION_START)}
              value={
                values[FORM_FIELDS.SESSION_START]
                  ? dayjs(values[FORM_FIELDS.SESSION_START])
                  : undefined
              }
              onChange={(_, dateString) =>
                setFieldValue(FORM_FIELDS.SESSION_START, `${dateString}`)
              }
              disabled={isUpdateLoading}
              required
            />

            <DatePicker
              label="Session End"
              className="h-[46px]"
              placeholder="Enter Session End"
              picker="month"
              name={FORM_FIELDS.SESSION_END}
              error={getFieldError(FORM_FIELDS.SESSION_END)}
              value={
                values[FORM_FIELDS.SESSION_END]
                  ? dayjs(values[FORM_FIELDS.SESSION_END])
                  : undefined
              }
              onChange={(_, dateString) =>
                setFieldValue(FORM_FIELDS.SESSION_END, `${dateString}`)
              }
              disabled={isUpdateLoading}
              required
            />

            <Input
              label="Note"
              placeholder="Enter Note"
              name={FORM_FIELDS.NOTE}
              value={values[FORM_FIELDS.NOTE] as string}
              error={getFieldError(FORM_FIELDS.NOTE)}
              onChange={handleChange}
              disabled={isUpdateLoading}
            />
          </div>

          <div className="flex items-center mt-6 gap-3">
            <Button
              className="min-w-24 h-12 rounded-lg"
              disabled={isUpdateLoading}
              onClick={() => resetForm()}
              danger
            >
              Reset
            </Button>
            <Button
              type="primary"
              className="min-w-24 h-12 rounded-lg"
              htmlType="submit"
              disabled={isUpdateLoading}
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
