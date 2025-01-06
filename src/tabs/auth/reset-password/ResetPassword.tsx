import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonV1 from "src/components/buttons/ButtonV1";
import StatusCard from "src/components/cards/StatusCard";
import Input from "src/components/inputs/Input";
import useNotification from "src/hooks/useNotification";
import { object, ref, string } from "yup";
import { useResetPassword } from "../api-client";
import PublicLayout from "../PublicLayout";

const FORM_FIELDS = {
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
};

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { errorNotification } = useNotification();
  const { execute, isLoading, isSuccess, error } = useResetPassword();
  const { values, errors, handleSubmit, setFieldValue, touched } = useFormik({
    initialValues: {
      [FORM_FIELDS.CONFIRM_PASSWORD]: "",
      [FORM_FIELDS.PASSWORD]: "",
    },
    validationSchema: object({
      [FORM_FIELDS.PASSWORD]: string().required("This is a Required field."),
      [FORM_FIELDS.CONFIRM_PASSWORD]: string()
        .required("This is a Required field.")
        .oneOf([ref("password"), ""], "Passwords must match"),
    }),
    onSubmit: ({ password }) => {
      execute({ password, token });
    },
  });

  useEffect(() => {
    if (error) {
      const errorStatus = error?.cause?.status;
      if (errorStatus === 400) {
        errorNotification("Invalid Token.");
      } else if (errorStatus === 401) {
        errorNotification("Token Expired.");
      } else {
        errorNotification();
      }
    }
  }, [error, errorNotification]);

  const isSuccessFul = useMemo(() => isSuccess && !error, [error, isSuccess]);

  return (
    <PublicLayout
      leftSection={{
        heading: "Reset Your Password in a Snap",
        features: [
          {
            text: "Time for a fresh start! Enter your new password and secure your account in just a few steps.",
          },
          {
            text: "We ensure a smooth and hassle-free password reset process for you.",
          },
        ],
      }}
      rightSection={
        isSuccessFul
          ? {}
          : {
              heading: "Reset Password",
              subHeading:
                "Follow the instructions below to reset your password and regain access to your account.",
            }
      }
    >
      {isSuccessFul ? (
        <StatusCard
          title="Password Changed."
          subtitle="Your password has been changed successfully. You can now log in with your new password.
 If you didn't make this change, please contact our support team immediately."
        />
      ) : (
        <div className="flex flex-col">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-start"
            noValidate
          >
            <Input
              type="password"
              label="Enter Password"
              placeholder="Enter Password"
              name={FORM_FIELDS.PASSWORD}
              value={values[FORM_FIELDS.PASSWORD]}
              error={
                touched[FORM_FIELDS.PASSWORD]
                  ? errors[FORM_FIELDS.PASSWORD]
                  : undefined
              }
              onChange={(e) =>
                setFieldValue(FORM_FIELDS.PASSWORD, e.target.value)
              }
              required
            />
            <Input
              type="password"
              label="Re-Enter Password"
              placeholder="Re-Enter Password"
              name={FORM_FIELDS.CONFIRM_PASSWORD}
              value={values[FORM_FIELDS.CONFIRM_PASSWORD]}
              error={
                touched[FORM_FIELDS.CONFIRM_PASSWORD]
                  ? errors[FORM_FIELDS.CONFIRM_PASSWORD]
                  : undefined
              }
              onChange={(e) =>
                setFieldValue(FORM_FIELDS.CONFIRM_PASSWORD, e.target.value)
              }
              required
              className="mt-6"
            />

            <ButtonV1
              className={"mt-6 w-[70%]"}
              type="submit"
              text={isLoading ? "Loading..." : "Reset"}
              primary
            />
          </form>

          <p className="mt-[15px] text-left text-sm text-gray-500 gap-2">
            Already have an account ?{" "}
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
  );
};

export default ResetPassword;
