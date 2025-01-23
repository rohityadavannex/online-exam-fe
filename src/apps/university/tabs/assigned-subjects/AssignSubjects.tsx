import { Modal } from "antd";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import DatePicker from "src/components/calendar/DatePicker";
import Select from "src/components/select/Select";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { object, string } from "yup";
import { useGetUniversitySubjects } from "../subjects/api-client";
import {
  useAssignSubject,
  useGetAssignedSubjectInfo,
  useUpdateAssignSubject,
} from "./api-client";

enum FORM_FIELDS {
  SUBJECT = "subjectId",
  EXAM_DATE = "examDate",
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
  const { examId } = useParams();
  const { errorNotification, successNotification } = useNotification();

  const { isLoading: isGetSubjectsLoading, data: subjectsData } =
    useGetUniversitySubjects();

  const {
    isLoading: isUpdateLoading,
    execute: updateData,
    isSuccess: isUpdateSuccess,
    error: updateErr,
  } = useUpdateAssignSubject({
    examId: Number(examId),
    subjectId: subjectId as number,
  });

  const { isLoading: isGetInfoLoading, data: subjectInfo } =
    useGetAssignedSubjectInfo({
      examId: Number(examId),
      subjectId: Number(subjectId),
    });

  const {
    isLoading: isCreateLoading,
    execute: executeCreate,
    isSuccess: isCreateSuccess,
    error: isCreateError,
  } = useAssignSubject({ examId: Number(examId) });

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.SUBJECT]: subjectInfo?.data?.subjectId ?? null,
        [FORM_FIELDS.EXAM_DATE]: subjectInfo?.data?.examDate ?? null,
      },
      validationSchema: object({
        [FORM_FIELDS.SUBJECT]: string().required("This is a Required field."),
      }),
      onSubmit: (values) => {
        if (subjectId) {
          updateData(values);
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
    if (isCreateSuccess || isUpdateSuccess) {
      successNotification();
      onClose();
    }
    if (isCreateError || updateErr) {
      errorNotification();
    }
  }, [
    errorNotification,
    isCreateError,
    isCreateSuccess,
    isUpdateSuccess,
    navigate,
    onClose,
    successNotification,
    updateErr,
  ]);

  return (
    <Modal
      title="Add Subject to this exam"
      open={isModalOpen}
      onOk={() => executeCreate({ subjectId })}
      onCancel={onClose}
      okText={isCreateLoading || isUpdateLoading ? "Loading..." : "Submit"}
      okButtonProps={{
        htmlType: "submit",
        onClick: () => handleSubmit(),
      }}
    >
      <div className="flex flex-col bg-white rounded-md py-4 w-full gap-3">
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
          disabled={isCreateLoading || isUpdateLoading}
        />

        <DatePicker
          label="Exam Date"
          name={FORM_FIELDS.EXAM_DATE}
          value={
            values[FORM_FIELDS.EXAM_DATE]
              ? dayjs(values[FORM_FIELDS.EXAM_DATE])
              : null
          }
          error={getFieldError(FORM_FIELDS.EXAM_DATE)}
          onChange={(value) => setFieldValue(FORM_FIELDS.EXAM_DATE, value)}
          disabled={isGetSubjectsLoading || isCreateLoading || isUpdateLoading}
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
