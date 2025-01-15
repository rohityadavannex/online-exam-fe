import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import Button from "src/components/buttons/Button";
import Input from "src/components/inputs/Input";
import Toggle from "src/components/toggles/Toggle";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { object, string } from "yup";
import {
  useCreateSubject,
  useGetSubjectInfo,
  useUpdateSubject,
} from "./api-client";

enum FORM_FIELDS {
  NAME = "name",
  STATUS = "status",
}

const CreateSubject = () => {
  useSetActiveTab(TAB_NAMES.SUBJECT);
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const { errorNotification, successNotification } = useNotification();

  const {
    isLoading: isCreateLoading,
    execute: executeCreate,
    isSuccess: isCreateSuccess,
    error: isCreateError,
  } = useCreateSubject();

  const {
    isLoading: isUpdateLoading,
    execute: executeUpdate,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdateSubject({ subjectId: Number(subjectId) });

  const { isLoading: isGetInfoLoading, data: response } = useGetSubjectInfo({
    subjectId: Number(subjectId),
  });

  const initialData = useMemo(() => response?.data ?? {}, [response?.data]);

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.NAME]: initialData?.name ?? "",
        [FORM_FIELDS.STATUS]: initialData?.status ?? false,
      },
      validationSchema: object({
        [FORM_FIELDS.NAME]: string().required("This is a Required field."),
      }),
      onSubmit: (values) => {
        console.log("Form submitted ", values);
        if (subjectId) {
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
      navigate("/subjects");
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
      <TabHeader label="Add Subject" />
      <div className="flex flex-col bg-white rounded-md py-[42px] px-[34px]">
        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              placeholder="Enter Subject Name"
              name={FORM_FIELDS.NAME}
              value={values[FORM_FIELDS.NAME] as string}
              error={getFieldError(FORM_FIELDS.NAME)}
              onChange={handleChange}
              disabled={isUpdateLoading}
              required
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
              onClick={() => navigate("/subjects")}
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

export default CreateSubject;
