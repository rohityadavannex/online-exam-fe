import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import ButtonV1 from "src/components/buttons/ButtonV1";
import Input from "src/components/inputs/Input";
import useNotification from "src/hooks/useNotification";
import { ViewIcon } from "src/icons";
import { object, ref, string } from "yup";
import { useUpdatePassword } from "../api-profile";

const FORM_FIELDS = {
  PASSWORD: "password",
  NEW_PASSWORD: "newPassword",
  CONFIRM_PASSWORD: "confirmPassword",
};

const EditPassword = () => {
  const [visible, setVisible] = useState({
    [FORM_FIELDS.PASSWORD]: false,
    [FORM_FIELDS.NEW_PASSWORD]: false,
    [FORM_FIELDS.CONFIRM_PASSWORD]: false,
  });

  const {
    isLoading: isUpdateLoading,
    execute: updatePassword,
    error,
    isSuccess,
  } = useUpdatePassword();

  const { successNotification, errorNotification } = useNotification();

  const { values, touched, errors, setFieldValue, handleSubmit, resetForm } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.PASSWORD]: "",
        [FORM_FIELDS.NEW_PASSWORD]: "",
        [FORM_FIELDS.CONFIRM_PASSWORD]: "",
      },
      validationSchema: object({
        [FORM_FIELDS.PASSWORD]: string().required("This is a Required field."),
        [FORM_FIELDS.NEW_PASSWORD]: string().required(
          "This is a Required field."
        ),
        [FORM_FIELDS.CONFIRM_PASSWORD]: string()
          .oneOf([ref(FORM_FIELDS.NEW_PASSWORD), ""], "Passwords must match")
          .required("This is a Required field."),
      }),
      onSubmit: (data) => {
        delete data.confirmPassword;
        updatePassword(data);
      },
    });

  useEffect(() => {
    if (isSuccess) {
      successNotification("Password Updated.");
      resetForm();
    } else if (error) {
      errorNotification("Something went wrong!!");
    }
  }, [error, errorNotification, isSuccess, resetForm, successNotification]);

  const getFieldError = useCallback(
    (fieldName: string) => {
      return touched[fieldName] ? (errors[fieldName] as string) : undefined;
    },
    [errors, touched]
  );

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] col-span-10">
        <Input
          type={visible[FORM_FIELDS.PASSWORD] ? "text" : "password"}
          label="Old Password"
          placeholder="Old Password"
          name={FORM_FIELDS.PASSWORD}
          value={values[FORM_FIELDS.PASSWORD] as string}
          error={getFieldError(FORM_FIELDS.PASSWORD)}
          onChange={(e) => setFieldValue(FORM_FIELDS.PASSWORD, e.target.value)}
          rightIcon={() => (
            <span
              onClick={() =>
                setVisible((prev) => ({
                  ...prev,
                  [FORM_FIELDS.PASSWORD]: !prev[FORM_FIELDS.PASSWORD],
                }))
              }
            >
              <ViewIcon />
            </span>
          )}
          required
        />

        <Input
          type={visible[FORM_FIELDS.NEW_PASSWORD] ? "text" : "password"}
          label="New Password"
          placeholder="New Password"
          name={FORM_FIELDS.NEW_PASSWORD}
          value={values[FORM_FIELDS.NEW_PASSWORD] as string}
          error={getFieldError(FORM_FIELDS.NEW_PASSWORD)}
          onChange={(e) =>
            setFieldValue(FORM_FIELDS.NEW_PASSWORD, e.target.value)
          }
          rightIcon={() => (
            <span
              onClick={() =>
                setVisible((prev) => ({
                  ...prev,
                  [FORM_FIELDS.NEW_PASSWORD]: !prev[FORM_FIELDS.NEW_PASSWORD],
                }))
              }
            >
              <ViewIcon />
            </span>
          )}
          required
        />

        <Input
          type={visible[FORM_FIELDS.CONFIRM_PASSWORD] ? "text" : "password"}
          label="Confirm Password"
          placeholder="Confirm Password"
          name={FORM_FIELDS.CONFIRM_PASSWORD}
          value={values[FORM_FIELDS.CONFIRM_PASSWORD] as string}
          error={getFieldError(FORM_FIELDS.CONFIRM_PASSWORD)}
          onChange={(e) =>
            setFieldValue(FORM_FIELDS.CONFIRM_PASSWORD, e.target.value)
          }
          rightIcon={() => (
            <span
              onClick={() =>
                setVisible((prev) => ({
                  ...prev,
                  [FORM_FIELDS.CONFIRM_PASSWORD]:
                    !prev[FORM_FIELDS.CONFIRM_PASSWORD],
                }))
              }
            >
              <ViewIcon />
            </span>
          )}
          required
        />
      </div>
      <ButtonV1
        text={isUpdateLoading ? "Loading..." : "Submit"}
        onClick={handleSubmit}
        primary
        className="h-[40px] !px-16 mt-[30px]"
      />
    </div>
  );
};

export default EditPassword;
