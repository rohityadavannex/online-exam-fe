import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "src/components/buttons/Button";
import StatusCard from "src/components/cards/StatusCard";
import Input, { ErrorMessage } from "src/components/inputs/Input";
import Select from "src/components/select/Select";
import useNotification from "src/hooks/useNotification";
import { CheckBoxIcon } from "src/icons/CheckboxIcon";
import { ViewIcon } from "src/icons/ViewIcon";
import cities from "src/utils/cities.json";
import states from "src/utils/states.json";
import { boolean, object, ref, string } from "yup";
import PublicLayout from "../PublicLayout";
import { useRegister } from "../api-client";
import TermsAndConditionModal from "./TermsAndConditionModal";

const FORM_FIELDS = {
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
  PHONE_NUMBER: "phoneNumber",
  INSTITUTES: "instituteName",
  CITY: "city",
  STATE: "state",
  DISTRICT: "district",
  TERMS_AND_CONDITION: "termsAndCondition",
};

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // Custom regex for validating emails

const Register = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { errorNotification } = useNotification();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const { isLoading, isSuccess, error, execute: register } = useRegister();
  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      initialValues: {
        [FORM_FIELDS.INSTITUTES]: "",
        [FORM_FIELDS.NAME]: "",
        [FORM_FIELDS.EMAIL]: "",
        [FORM_FIELDS.PASSWORD]: "",
        [FORM_FIELDS.CONFIRM_PASSWORD]: "",
        [FORM_FIELDS.PHONE_NUMBER]: "",
        [FORM_FIELDS.CITY]: "",
        [FORM_FIELDS.STATE]: "",
        [FORM_FIELDS.DISTRICT]: "",
        [FORM_FIELDS.TERMS_AND_CONDITION]: false,
      },
      validationSchema: object({
        [FORM_FIELDS.INSTITUTES]: string().required(
          "This is a Required field."
        ),
        [FORM_FIELDS.NAME]: string().required("This is a Required field."),
        [FORM_FIELDS.EMAIL]: string()
          .matches(emailRegex, "Invalid email format")
          .required("This is a Required field."),
        [FORM_FIELDS.PASSWORD]: string().required("This is a Required field."),
        [FORM_FIELDS.CONFIRM_PASSWORD]: string()
          .required("This is a Required field.")
          .oneOf([ref(FORM_FIELDS.PASSWORD), ""], "Passwords must match"),
        [FORM_FIELDS.PHONE_NUMBER]: string().required(
          "This is a Required field."
        ),
        [FORM_FIELDS.TERMS_AND_CONDITION]: boolean().oneOf(
          [true],
          "Please accept the Terms & Condition"
        ),
      }),
      onSubmit: (data) => {
        register(data);
      },
    });

  const getFieldError = useCallback(
    (fieldName: string) => {
      return touched[fieldName] ? (errors[fieldName] as string) : undefined;
    },
    [errors, touched]
  );

  useEffect(() => {
    if (error) {
      const errorStatus = error?.cause?.status;
      if (errorStatus === 409) {
        errorNotification("Account already exist with this email");
      } else {
        errorNotification();
      }
    }
  }, [error, errorNotification]);

  return (
    <>
      <TermsAndConditionModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
      <PublicLayout
        leftSection={{
          heading: "Signup",
          subHeading: "Signup to Schoollog",
        }}
      >
        {isSuccess ? (
          <StatusCard
            title="Verify your email address."
            subtitle="We have sent you an confirmation email click on that in order to verify your email address."
          />
        ) : (
          <div className="flex flex-col">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
              noValidate
            >
              <Input
                label="Institutes name"
                placeholder="Institutes"
                name={FORM_FIELDS.INSTITUTES}
                value={values[FORM_FIELDS.INSTITUTES] as string}
                error={getFieldError(FORM_FIELDS.INSTITUTES)}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <div className="grid grid-cols-2 gap-4 mt-3">
                <Input
                  label="Enter Name"
                  placeholder="name"
                  name={FORM_FIELDS.NAME}
                  value={values[FORM_FIELDS.NAME] as string}
                  error={getFieldError(FORM_FIELDS.NAME)}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <Input
                  label="Email Address"
                  placeholder="Email Address"
                  name={FORM_FIELDS.EMAIL}
                  value={values[FORM_FIELDS.EMAIL] as string}
                  error={getFieldError(FORM_FIELDS.EMAIL)}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  wrapperClassName="mt-3"
                  type={isPasswordVisible ? "text" : "password"}
                  label="Password"
                  placeholder="Password"
                  name={FORM_FIELDS.PASSWORD}
                  value={values[FORM_FIELDS.PASSWORD] as string}
                  error={getFieldError(FORM_FIELDS.PASSWORD)}
                  suffix={
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="cursor-pointer"
                    >
                      <ViewIcon color="#000000" />
                    </span>
                  }
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />

                <Input
                  wrapperClassName="mt-3"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  name={FORM_FIELDS.CONFIRM_PASSWORD}
                  value={values[FORM_FIELDS.CONFIRM_PASSWORD] as string}
                  error={getFieldError(FORM_FIELDS.CONFIRM_PASSWORD)}
                  suffix={
                    <span
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      className="cursor-pointer"
                    >
                      <ViewIcon color="#000000" />
                    </span>
                  }
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <Input
                wrapperClassName="mt-3"
                label="Phone Number"
                placeholder="Phone Number"
                name={FORM_FIELDS.PHONE_NUMBER}
                value={values[FORM_FIELDS.PHONE_NUMBER] as string}
                error={getFieldError(FORM_FIELDS.PHONE_NUMBER)}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <div className="grid grid-cols-3 gap-4">
                <Select
                  label="State"
                  showSearch
                  placeholder="State"
                  optionFilterProp="label"
                  options={states}
                  name={FORM_FIELDS.STATE}
                  error={errors[FORM_FIELDS.STATE]}
                  onChange={(val: string) =>
                    setFieldValue(`${FORM_FIELDS.STATE}`, val)
                  }
                />
                <Select
                  label="District"
                  showSearch
                  placeholder="District"
                  optionFilterProp="label"
                  options={cities}
                  name={FORM_FIELDS.DISTRICT}
                  error={errors[FORM_FIELDS.DISTRICT]}
                  onChange={(val: string) =>
                    setFieldValue(`${FORM_FIELDS.DISTRICT}`, val)
                  }
                />
                <Select
                  label="City"
                  showSearch
                  placeholder="City"
                  optionFilterProp="label"
                  options={cities}
                  name={FORM_FIELDS.CITY}
                  error={errors[FORM_FIELDS.CITY]}
                  onChange={(val: string) =>
                    setFieldValue(`${FORM_FIELDS.CITY}`, val)
                  }
                />
              </div>

              <div className="flex flex-col gap-3 justify-between text-sm text-right mt-4 items-start">
                <div className="flex gap-2 items-center">
                  <CheckBoxIcon
                    checked={values[FORM_FIELDS.TERMS_AND_CONDITION] as boolean}
                    onClick={(value) =>
                      setFieldValue(FORM_FIELDS.TERMS_AND_CONDITION, value)
                    }
                  />
                  <div className="flex gap-1 items-center">
                    You are agreeing to the
                    <span className="text-primary cursor-pointer">
                      Terms of Services
                    </span>{" "}
                    and
                    <span className="text-primary cursor-pointer">
                      Privacy Policy
                    </span>
                  </div>
                </div>
                <ErrorMessage
                  text={
                    touched[FORM_FIELDS.TERMS_AND_CONDITION]
                      ? errors[FORM_FIELDS.TERMS_AND_CONDITION]
                      : undefined
                  }
                />
              </div>

              <Button
                htmlType="submit"
                type="primary"
                className="px-5 py-3 h-fit rounded-lg w-1/2"
                loading={isLoading}
              >
                Signup
              </Button>
            </form>

            <p className="mt-[15px] text-left text-sm text-gray-500 gap-2">
              Already A member?{" "}
              <span
                onClick={() => navigate("/login")}
                className="font-semibold leading-6 text-primary hover:text-primary-800 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </div>
        )}
      </PublicLayout>
    </>
  );
};

export default Register;
