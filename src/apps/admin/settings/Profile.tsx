import { Button, notification } from "antd";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "src/components/inputs/Input";
import { userInfoRequestSucceed } from "src/redux/actions/app";
import { getCurrentUserInfo } from "src/redux/selectors/app";
import { object, string } from "yup";
import { useUpdateUserProfile } from "./apis";

const FORM_FIELDS = {
  NAME: "name",
  EMAIL: "email",
};

const Profile = () => {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const currentUserInfo = useSelector(getCurrentUserInfo);

  const { inProgress, data, error, isSuccess, execute } =
    useUpdateUserProfile();

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      [FORM_FIELDS.NAME]: currentUserInfo?.name ?? "",
      [FORM_FIELDS.EMAIL]: currentUserInfo?.email ?? "",
    },
    validationSchema: object({
      [FORM_FIELDS.EMAIL]: string()
        .email("Please enter valid email.")
        .required("This is a Required field."),
      [FORM_FIELDS.NAME]: string().required("This is a Required field."),
    }),
    onSubmit: ({ name, email }) => {
      execute(name);
    },
  });

  const openNotification = useCallback(() => {
    api.success({
      message: "Data updated Successfully.",
      duration: 20,
    });
  }, [api]);

  useEffect(() => {
    if (isSuccess) {
      openNotification();
      dispatch(userInfoRequestSucceed(data?.data));
    }
  }, [data?.data, dispatch, isSuccess, openNotification]);

  const hasSomethingChanged = useMemo(
    () => currentUserInfo?.name === values[FORM_FIELDS.NAME],
    [currentUserInfo?.name, values]
  );

  return (
    <>
      {contextHolder}
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 ">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <form className="md:col-span-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="col-span-full flex items-center gap-x-8">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
              />
              <div>
                <button
                  type="button"
                  className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-white/20"
                >
                  Change avatar
                </button>
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>

            <Input
              label="Enter Name"
              name={FORM_FIELDS.NAME}
              value={values[FORM_FIELDS.NAME]}
              error={errors[FORM_FIELDS.NAME] as string}
              onChange={handleChange}
              disabled={inProgress}
            />
            <Input
              type="email"
              label="Enter Email"
              name={FORM_FIELDS.EMAIL}
              value={values[FORM_FIELDS.EMAIL]}
              error={errors[FORM_FIELDS.EMAIL] as string}
              onChange={handleChange}
              disabled={true}
            />
          </div>

          <Button
            className={"mt-8"}
            type="primary"
            htmlType="submit"
            disabled={inProgress || hasSomethingChanged}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Profile;
