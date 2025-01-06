import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "antd";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "src/components/contexts/NotificationContext";
import Input from "src/components/inputs/Input";
import HorizontalSeparator from "src/components/seperators/HorizontalSeperator";
import { object, string } from "yup";
import { useCreateUser, useGetUserInfo, useUpdateUser } from "./api";

const FORM_FIELDS = {
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
};

const CreateUsers = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { successNotification, errorNotification } = useNotification();
  const { data: userDataRes } = useGetUserInfo(Number(userId));
  const userData = useMemo(() => userDataRes?.data ?? {}, [userDataRes?.data]);

  const {
    inProgress: isCreateInProgress,
    execute: handleUserCreate,
    isSuccess: isCreateSucceed,
    error: createError,
  } = useCreateUser();
  const {
    execute: handleUserUpdate,
    isSuccess: isUpdateSucceed,
    error: updateError,
  } = useUpdateUser();

  const { values, errors, handleSubmit, handleChange } = useFormik({
    enableReinitialize: true,
    initialValues: {
      [FORM_FIELDS.NAME]: userData?.name ?? "",
      [FORM_FIELDS.EMAIL]: userData?.email ?? "",
      [FORM_FIELDS.PASSWORD]: userData?.password ?? "",
    },
    validationSchema: object({
      [FORM_FIELDS.NAME]: string().required("This is a Required field."),
      [FORM_FIELDS.EMAIL]: string()
        .email("Please enter valid email.")
        .required("This is a Required field."),
      [FORM_FIELDS.PASSWORD]: string().required("This is a Required field."),
    }),
    onSubmit: ({ name, email, password }) => {
      if (userId) {
        handleUserUpdate({ name, email, password, userId: Number(userId) });
        return;
      }
      handleUserCreate({ name, email, password });
    },
  });

  useEffect(() => {
    if (isCreateSucceed || isUpdateSucceed) {
      successNotification();
      navigate("/users");
    }
  }, [isCreateSucceed, isUpdateSucceed, navigate, successNotification]);

  useEffect(() => {
    if (createError || updateError) {
      if (createError?.cause?.status === 409) {
        errorNotification("Email is already in use.");
        return;
      }
      errorNotification();
    }
  }, [createError, errorNotification, updateError]);

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
          <span>Add User</span>
        </div>
        <Button type="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </div>
      <HorizontalSeparator />
      <div className="flex flex-col gap-3 p-5">
        <Input
          type="text"
          label="Enter Full Name"
          name={FORM_FIELDS.NAME}
          value={values[FORM_FIELDS.NAME]}
          error={errors[FORM_FIELDS.NAME]}
          onChange={handleChange}
        />
        <Input
          type="email"
          label="Enter Email"
          name={FORM_FIELDS.EMAIL}
          value={values[FORM_FIELDS.EMAIL]}
          error={errors[FORM_FIELDS.EMAIL]}
          onChange={handleChange}
        />
        <Input
          type="password"
          label="Enter Password"
          name={FORM_FIELDS.PASSWORD}
          value={values[FORM_FIELDS.PASSWORD]}
          error={errors[FORM_FIELDS.PASSWORD]}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CreateUsers;
