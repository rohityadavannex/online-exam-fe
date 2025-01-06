import { Button } from "antd";
import { useFormik } from "formik";
import Input from "src/components/inputs/Input";
import { object, ref, string } from "yup";

const FORM_FIELDS = {
  PASSWORD: "password",
  NEW_PASSWORD: "newPassword",
  CONFIRM_PASSWORD: "confirmPassword",
};

const UpdatePassword = () => {
  const { values, errors, handleSubmit, handleChange } = useFormik({
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
        .required("This is a Required field.")
        .oneOf([ref("newPassword"), ""], "Passwords must match"),
    }),
    onSubmit: ({ password, newPassword, confirmPassword }) => {},
  });

  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 ">Change password</h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Update your password associated with your account.
        </p>
      </div>

      <form className="md:col-span-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input
            type="password"
            label="Current Password"
            name={FORM_FIELDS.PASSWORD}
            value={values[FORM_FIELDS.PASSWORD]}
            error={errors[FORM_FIELDS.PASSWORD] as string}
            onChange={handleChange}
          />
          <Input
            type="password"
            label="New Password"
            name={FORM_FIELDS.NEW_PASSWORD}
            value={values[FORM_FIELDS.NEW_PASSWORD]}
            error={errors[FORM_FIELDS.NEW_PASSWORD] as string}
            onChange={handleChange}
          />
          <Input
            label="Confirm Password"
            name={FORM_FIELDS.CONFIRM_PASSWORD}
            value={values[FORM_FIELDS.CONFIRM_PASSWORD]}
            error={errors[FORM_FIELDS.CONFIRM_PASSWORD] as string}
            onChange={handleChange}
          />
        </div>

        <Button className={"mt-8"} type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
