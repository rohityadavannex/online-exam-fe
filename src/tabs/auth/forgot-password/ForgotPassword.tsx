import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "src/components/buttons/Button";
import StatusCard from "src/components/cards/StatusCard";
// import Input from "src/components/inputs/Input";
import { Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import Button from "src/components/buttons/Button";
import useNotification from "src/hooks/useNotification";
import { ArrowRightIcon } from "src/icons";
import { object, string } from "yup";
import { useForgotPassword } from "../api-client";

const FORM_FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { errorNotification } = useNotification();
  const { execute, isLoading, isSuccess, error } = useForgotPassword();
  const { values, errors, handleSubmit, setFieldValue, touched } = useFormik({
    initialValues: {
      [FORM_FIELDS.EMAIL]: "",
    },
    validationSchema: object({
      [FORM_FIELDS.EMAIL]: string()
        .email("Please enter valid email.")
        .required("This is a Required field."),
    }),
    onSubmit: ({ email }) => {
      execute({ email });
    },
  });

  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };

  const onInput: OTPProps["onInput"] = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };

  useEffect(() => {
    if (error) {
      const errorStatus = error?.cause?.status;
      if (errorStatus === 404) {
        errorNotification("Account doesn't exist.");
      } else {
        errorNotification();
      }
    }
  }, [error, errorNotification]);

  const isSuccessFul = useMemo(() => isSuccess && !error, [error, isSuccess]);

  return (
    <div className="bg-[#F4F5F9] h-full flex items-center justify-center">
      <div className="flex h-full w-full max-w-[625px] max-h-[600px] m-auto bg-white px-14 py-10 gap-[62px] rounded-[30px] shadow-[0_4px_4px_0_#00000025]">
        {isSuccessFul ? (
          <StatusCard
            title="Check Your Email."
            subtitle="Please check the email for instruction to reset your password."
          />
        ) : (
          <div className="flex flex-col">
            <div className="text-[#0D121D] text-3xl font-semibold">
              Forgot password?
            </div>
            <div className="text-[#111827] text-base font-normal mt-3">
              No worries, we’ll send you reset instruction.
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-start mt-6 gap-6"
              noValidate
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="username">Enter Username</label>
                <Input
                  id="username"
                  placeholder="Username"
                  className="px-5 py-3 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="username">OTP</label>
                <div>
                  <Input.OTP
                    formatter={(str) => str.toUpperCase()}
                    {...sharedProps}
                  />
                </div>
              </div>

              <Button type="link" danger className="w-fit ml-auto p-0">
                Resend OTP
              </Button>

              <Button type="primary" className="px-5 py-3 h-fit rounded-lg">
                Reset
              </Button>
            </form>

            <span
              onClick={() => navigate("/login")}
              className="text-primary cursor-pointer flex items-center gap-2 text-sm font-medium mt-6"
            >
              <ArrowRightIcon color="#5900d9" />
              Back to login
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
