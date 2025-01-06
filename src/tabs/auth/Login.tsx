import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "src/components/buttons/Button";
import Input from "src/components/inputs/Input";
import useNotification from "src/hooks/useNotification";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MessageIcon,
  ViewIcon,
  WebIcon,
} from "src/icons";
import CallIcon from "src/icons/CallIcon";
import { initialize } from "src/redux/actions/app";
import { object, string } from "yup";
import { setTokenInLocalStorage } from "../../helpers/helpers";
import PublicLayout from "./PublicLayout";
import { useLogin } from "./api-client";

const FORM_FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorNotification } = useNotification();
  const { execute, isLoading, isSuccess, data, error } = useLogin();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      [FORM_FIELDS.EMAIL]: "",
      [FORM_FIELDS.PASSWORD]: "",
    },
    validationSchema: object({
      [FORM_FIELDS.EMAIL]: string()
        .email("Please enter valid email.")
        .required("This is a Required field."),
      [FORM_FIELDS.PASSWORD]: string().required("This is a Required field."),
    }),
    onSubmit: ({ email, password }) => {
      execute(email, password);
    },
  });

  const getFieldError = useCallback(
    (fieldName: string) => {
      return touched[fieldName] ? (errors[fieldName] as string) : undefined;
    },
    [errors, touched]
  );

  useEffect(() => {
    if (isSuccess) {
      setTokenInLocalStorage(data.data.token);
      dispatch(initialize());

      navigate("/");
    }
  }, [data?.data?.role, data?.data?.token, dispatch, isSuccess, navigate]);

  useEffect(() => {
    if (error) {
      const errorStatus = error?.cause?.status;
      if ([403, 404].includes(errorStatus)) {
        errorNotification("Invalid Email/Password.");
      } else {
        errorNotification();
      }
    }
  }, [error, errorNotification]);

  return (
    <PublicLayout
      leftSection={{
        heading: "Sign In",
        subHeading: "Sign in to Schoollog",
      }}
    >
      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start"
          noValidate
        >
          <Input
            type="email"
            label="Enter Username"
            placeholder="Username"
            name={FORM_FIELDS.EMAIL}
            value={values[FORM_FIELDS.EMAIL] as string}
            error={getFieldError(FORM_FIELDS.EMAIL)}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          <Input
            wrapperClassName="mt-6"
            type={isPasswordVisible ? "text" : "password"}
            label="Password"
            placeholder="Password"
            name={FORM_FIELDS.PASSWORD}
            suffix={
              <span
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="cursor-pointer"
              >
                <ViewIcon color="#000000" />
              </span>
            }
            value={values[FORM_FIELDS.PASSWORD] as string}
            error={getFieldError(FORM_FIELDS.PASSWORD)}
            onChange={handleChange}
            disabled={isLoading}
            required
          />

          <div className="flex items-center mt-6">
            <Button
              htmlType="submit"
              type="primary"
              className="px-5 py-3 h-fit rounded-lg w-full"
              loading={isLoading}
            >
              Login
            </Button>
            <Button
              color="primary"
              className="text-primary text-base font-medium w-full text-end"
              variant="link"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password
            </Button>
          </div>
        </form>

        <p className="mt-[15px] text-left text-sm text-gray-500 gap-2">
          Don't have an account ?{" "}
          <span
            onClick={() => navigate("/register")}
            className="font-semibold leading-6 text-primary hover:text-primary-800 cursor-pointer"
          >
            Sign Up
          </span>
        </p>

        <div className="text-[#111827] text-base font-medium mt-8">
          Need Help ?
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex gap-1 items-center pr-2 border-r border-[#D1D5DB]">
            <CallIcon />
            <div className="text-[#111827] text-base font-medium">
              +91-8448443326
            </div>
          </div>
          <div className="flex gap-1 items-center pr-2 border-r border-[#D1D5DB]">
            <MessageIcon />
            <div className="text-[#111827] text-base font-medium">
              info@schoollog.in
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <WebIcon />
            <div className="text-[#111827] text-base font-medium">
              https://schoollog.in
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <FacebookIcon />
          <InstagramIcon />
          <LinkedinIcon />
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
