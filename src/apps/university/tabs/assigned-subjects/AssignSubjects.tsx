import { Modal } from "antd";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import Select from "src/components/select/Select";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { object, string } from "yup";
import { useGetUniversitySubjects } from "../subjects/api-client";
import {
  useAssignSubject,
  useGetAssignedSubjectInfo,
  useUpdateAssignedSubject,
} from "./api-client";

enum FORM_FIELDS {
  SUBJECT = "subjectId",
}

const AssignSubjects = ({
  isModalOpen,
  onClose,
  subjectId,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  subjectId?: Number;
}) => {
  useSetActiveTab(TAB_NAMES.EXAM);
  const navigate = useNavigate();
  const { errorNotification, successNotification } = useNotification();

  const { isLoading: isGetSubjectsLoading, data: subjectsData } =
    useGetUniversitySubjects();

  const {
    isLoading: isCreateLoading,
    execute: executeCreate,
    isSuccess: isCreateSuccess,
    error: isCreateError,
  } = useAssignSubject();

  const {
    isLoading: isUpdateLoading,
    execute: executeUpdate,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdateAssignedSubject({ subjectId: Number(subjectId) });

  const { isLoading: isGetInfoLoading, data: response } =
    useGetAssignedSubjectInfo({
      subjectId: Number(subjectId),
    });

  const initialData = useMemo(() => response?.data ?? {}, [response?.data]);

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.SUBJECT]: initialData?.subjectId ?? null,
      },
      validationSchema: object({
        [FORM_FIELDS.SUBJECT]: string().required("This is a Required field."),
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
      navigate("/exams/subjects");
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
    <Modal
      title="Add Subject to this exam"
      open={isModalOpen}
      onOk={() => executeCreate({ subjectId })}
      onCancel={onClose}
      okText={isCreateLoading ? "Loading..." : "Add"}
      okButtonProps={{
        htmlType: "submit",
        onClick: () => handleSubmit(),
      }}
    >
      <div className="flex flex-col bg-white rounded-md py-4 w-full">
        <Select
          label="Select Subject"
          showSearch
          placeholder="Select Subject"
          optionFilterProp="label"
          options={subjectsData}
          name={FORM_FIELDS.SUBJECT}
          value={values[FORM_FIELDS.SUBJECT] as string}
          error={errors[FORM_FIELDS.SUBJECT] as string}
          onChange={(val: string) =>
            setFieldValue(`${FORM_FIELDS.SUBJECT}`, val)
          }
          loading={isGetSubjectsLoading}
          required
        />

        {/* <div className="flex items-center mt-6 gap-3">
            <Button
              className="min-w-24 h-12 rounded-lg"
              danger
              disabled={isUpdateLoading || isCreateLoading}
              onClick={() => navigate("/exams/subjects")}
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
          </div> */}
      </div>
    </Modal>
  );
};

export default AssignSubjects;
