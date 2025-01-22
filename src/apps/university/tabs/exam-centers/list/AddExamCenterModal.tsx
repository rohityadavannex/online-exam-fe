import { Modal } from "antd";
import { useFormik } from "formik";
import Input from "src/components/inputs/Input";
import Select from "src/components/select/Select";

import { useEffect, useMemo } from "react";
import useNotification from "src/hooks/useNotification";
import { number, object } from "yup";
import { useCreateExamCenter, useGetAllCollegesList } from "../api-client";

enum FORM_FIELDS {
  COLLEGE_ID = "collegeId",
  CAPACITY = "capacity",
}

const AddExamCenterModal = ({
  isModalOpen,
  setIsModalOpen,

  examId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;

  examId: number;
}) => {
  const { successNotification, errorNotification } = useNotification();
  const { isLoading: isCollegesLoading, data: collegesRes } =
    useGetAllCollegesList({ examId });

  const {
    isLoading: isCreateLoading,
    execute: createExamCenter,
    isSuccess: isCreateSuccess,
    error: createError,
  } = useCreateExamCenter({ examId });

  const mappedData = useMemo(() => {
    return (collegesRes?.data?.rows ?? []).map((item: any) => ({
      label: item.name,
      value: item.userId,
    }));
  }, [collegesRes?.data]);

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.COLLEGE_ID]: null,
        [FORM_FIELDS.CAPACITY]: null,
      },
      validationSchema: object({
        [FORM_FIELDS.COLLEGE_ID]: number().required(
          "This is a Required field."
        ),
        [FORM_FIELDS.CAPACITY]: number().required("This is a Required field."),
      }),
      onSubmit: (values) => {
        createExamCenter(values);
      },
    });

  useEffect(() => {
    if (isCreateSuccess) {
      successNotification();
      setIsModalOpen(false);
    }

    if (createError) {
      errorNotification();
    }
  }, [
    createError,
    errorNotification,
    isCreateSuccess,
    setIsModalOpen,
    successNotification,
  ]);

  return (
    <Modal
      title="Add Exam Center"
      open={isModalOpen}
      onOk={() => onSubmit()}
      onCancel={() => setIsModalOpen(false)}
      okText={isCreateLoading ? "Loading..." : "Submit"}
      okButtonProps={{
        htmlType: "submit",
        onClick: () => handleSubmit(),
      }}
    >
      <div className="flex flex-col bg-white rounded-md py-4 w-full gap-3">
        <Select
          label="Select College"
          showSearch
          placeholder="Select College"
          optionFilterProp="label"
          options={mappedData}
          name={FORM_FIELDS.COLLEGE_ID}
          value={values[FORM_FIELDS.COLLEGE_ID]}
          error={errors[FORM_FIELDS.COLLEGE_ID] as string}
          onChange={(val: string) =>
            setFieldValue(`${FORM_FIELDS.COLLEGE_ID}`, val)
          }
          loading={isCollegesLoading}
          required
        />
        <Input
          label="Enter Capacity"
          placeholder="Enter Capacity"
          name={FORM_FIELDS.CAPACITY}
          value={values[FORM_FIELDS.CAPACITY] as unknown as number}
          error={errors[FORM_FIELDS.CAPACITY] as string}
          onChange={handleChange}
          required
        />
      </div>
    </Modal>
  );
};

export default AddExamCenterModal;
