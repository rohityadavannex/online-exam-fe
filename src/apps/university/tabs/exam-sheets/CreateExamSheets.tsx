import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import Button from "src/components/buttons/Button";
import UploadFile from "src/components/image-upload/UploadFile";
import Input from "src/components/inputs/Input";
import Select from "src/components/select/Select";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { object, string } from "yup";
import { useGetUniversitySubjects } from "../subjects/api-client";
import { useCreateExamSheet } from "./api-client";

enum FORM_FIELDS {
  ROLL_NUMBER = "rollNo",
  SERIAL_NUMBER = "serialNo",
  SUBJECT_ID = "subjectId",
  ANSWER_SHEET = "examSheet",
}

const CreateExamSheets = () => {
  useSetActiveTab(TAB_NAMES.COURSES);
  const navigate = useNavigate();
  const { examId } = useParams();
  const { errorNotification, successNotification } = useNotification();

  const { isLoading: isGetSubjectsLoading, data: subjectsData } =
    useGetUniversitySubjects();

  const {
    isLoading: isCreateLoading,
    execute: executeCreate,
    isSuccess: isCreateSuccess,
    error: isCreateError,
  } = useCreateExamSheet({ examId: Number(examId) });

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.ROLL_NUMBER]: "",
        [FORM_FIELDS.SERIAL_NUMBER]: "",
        [FORM_FIELDS.SUBJECT_ID]: null,
        [FORM_FIELDS.ANSWER_SHEET]: null,
      },
      validationSchema: object({
        [FORM_FIELDS.ROLL_NUMBER]: string().required(
          "This is a Required field."
        ),
        [FORM_FIELDS.SERIAL_NUMBER]: string().required(
          "This is a Required field."
        ),
        [FORM_FIELDS.SUBJECT_ID]: string().required(
          "This is a Required field."
        ),
        [FORM_FIELDS.ANSWER_SHEET]: string().required(
          "This is a Required field."
        ),
      }),
      onSubmit: (values) => {
        console.log("Form submitted ", values);

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
      navigate(`/exams/${examId}/exam-sheets`);
    }
    if (isCreateError) {
      errorNotification();
    }
  }, [
    errorNotification,
    examId,
    isCreateError,
    isCreateSuccess,
    navigate,
    successNotification,
  ]);

  return (
    <div className="flex flex-col gap-6">
      {/* <TabHeader label="Add Exam Sheets" /> */}
      <div className="flex flex-col bg-white rounded-md py-[42px] px-[34px]">
        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Roll No."
              placeholder="Enter Roll Number"
              name={FORM_FIELDS.ROLL_NUMBER}
              value={values[FORM_FIELDS.ROLL_NUMBER] as string}
              error={getFieldError(FORM_FIELDS.ROLL_NUMBER)}
              onChange={handleChange}
              disabled={isCreateLoading}
              required
            />

            <Input
              label="Serial No."
              placeholder="Enter Serial Number"
              name={FORM_FIELDS.SERIAL_NUMBER}
              value={values[FORM_FIELDS.SERIAL_NUMBER] as string}
              error={getFieldError(FORM_FIELDS.SERIAL_NUMBER)}
              onChange={handleChange}
              disabled={isCreateLoading}
              required
            />

            <Select
              label="Select Subject"
              showSearch
              placeholder="Select Subject"
              optionFilterProp="label"
              options={subjectsData}
              name={FORM_FIELDS.SUBJECT_ID}
              value={values[FORM_FIELDS.SUBJECT_ID]}
              error={errors[FORM_FIELDS.SUBJECT_ID] as string}
              onChange={(val: string) =>
                setFieldValue(`${FORM_FIELDS.SUBJECT_ID}`, val)
              }
              loading={isGetSubjectsLoading}
              required
              disabled={isCreateLoading}
            />

            <UploadFile
              label="Answer Sheet"
              error={getFieldError(FORM_FIELDS.ANSWER_SHEET)}
              value={values[FORM_FIELDS.ANSWER_SHEET] as unknown as string}
              onChange={(value) =>
                setFieldValue(FORM_FIELDS.ANSWER_SHEET, value)
              }
              imageOnly={false}
              maxSize={12}
            />
          </div>

          <div className="flex items-center mt-6 gap-3">
            <Button
              className="min-w-24 h-12 rounded-lg"
              danger
              disabled={isCreateLoading}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="min-w-24 h-12 rounded-lg"
              htmlType="submit"
              disabled={isCreateLoading}
              loading={isCreateLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExamSheets;
