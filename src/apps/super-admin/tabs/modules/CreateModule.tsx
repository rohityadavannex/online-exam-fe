import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "antd";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import Input from "src/components/inputs/Input";
import HorizontalSeparator from "src/components/seperators/HorizontalSeperator";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { object, string } from "yup";
import { useCreateModule } from "./apis";

const FORM_FIELDS = {
  LABEL: "label",
  VALUE: "value",
};

const CreateModule = () => {
  useSetActiveTab(TAB_NAMES.MODULES);
  const navigate = useNavigate();

  const {
    inProgress,
    isSuccess: createSuccess,
    error: createError,
    execute: createModule,
  } = useCreateModule();

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      [FORM_FIELDS.LABEL]: "",
      [FORM_FIELDS.VALUE]: "",
    },
    validationSchema: object({
      [FORM_FIELDS.LABEL]: string().required("This is a Required field."),
      [FORM_FIELDS.VALUE]: string().required("This is a Required field."),
    }),
    onSubmit: ({ label, value }) => {
      createModule({ label, value });
    },
  });

  const isFormDisabled = useMemo(() => inProgress, [inProgress]);

  useEffect(() => {
    if (createSuccess) {
      navigate("/modules");
    }
  }, [createSuccess, navigate]);

  return (
    <div className="flex flex-col bg-white w-full rounded-xl">
      <div className="text-xl font-bold flex justify-between items-center p-5">
        <div className="flex items-center gap-4">
          <div
            className="rounded-full h-10 w-10 flex p-3 justify-center items-center bg-[#F4F7FE] cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ChevronLeftIcon />
          </div>
          <span>Add Module</span>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => handleSubmit()}
          loading={isFormDisabled}
        >
          Submit
        </Button>
      </div>
      <HorizontalSeparator />
      <div className="flex flex-col gap-3 p-5">
        <Input
          label="Enter Module Label"
          name={FORM_FIELDS.LABEL}
          value={values[FORM_FIELDS.LABEL]}
          error={errors[FORM_FIELDS.LABEL]}
          onChange={handleChange}
          disabled={false}
        />
        <Input
          label="Enter Module Value"
          name={FORM_FIELDS.VALUE}
          value={values[FORM_FIELDS.VALUE]}
          error={errors[FORM_FIELDS.VALUE]}
          onChange={handleChange}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default CreateModule;
