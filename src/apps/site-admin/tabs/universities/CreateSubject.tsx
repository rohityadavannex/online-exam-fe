import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import Button from "src/components/buttons/Button";
import Input from "src/components/inputs/Input";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { object, string } from "yup";
import { useUpdateSection } from "./api-subject";

enum FORM_FIELDS {
  SUBJECT_NAME = "subjectName",
}

const CreateSubject = () => {
  useSetActiveTab(TAB_NAMES.SUBJECT);
  const { subjectId } = useParams();
  const { errorNotification, successNotification } = useNotification();
  const {
    isLoading: isUpdateLoading,
    execute: updateSection,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdateSection();

  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    enableReinitialize: true,
    initialValues: {
      [FORM_FIELDS.SUBJECT_NAME]: "",
    },
    validationSchema: object({
      [FORM_FIELDS.SUBJECT_NAME]: string().required(
        "This is a Required field."
      ),
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
      <TabHeader label="Subjects" />
      <div className="flex flex-col bg-white rounded-md py-[42px] px-[34px]">
        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Subject Name"
              placeholder="Enter Subject Name"
              name={FORM_FIELDS.SUBJECT_NAME}
              value={values[FORM_FIELDS.SUBJECT_NAME] as string}
              error={getFieldError(FORM_FIELDS.SUBJECT_NAME)}
              onChange={handleChange}
              disabled={isUpdateLoading}
              required
            />
          </div>

          <div className="flex items-center mt-6 gap-3">
            <Button
              className="min-w-24 h-12 rounded-lg"
              danger
              disabled={isUpdateLoading}
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

export default CreateSubject;
