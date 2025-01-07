import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import Button from "src/components/buttons/Button";
import UploadImage from "src/components/image-upload/UploadImage";
import Input from "src/components/inputs/Input";
import Select from "src/components/select/Select";
import Toggle from "src/components/toggles/Toggle";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import cities from "src/utils/cities.json";
import states from "src/utils/states.json";
import { object, string } from "yup";
import { useCreateStaff, useGetStaffInfo, useUpdateStaff } from "./api-client";

enum FORM_FIELDS {
  NAME = "name",
  EMAIL = "email",
  PHONE = "phone",
  ADDRESS = "address",
  CITY = "city",
  STATE = "state",
  DISTRICT = "district",
  LOGO = "logo",
  STATUS = "active",
}

const CreateStaff = () => {
  useSetActiveTab(TAB_NAMES.STAFF);
  const navigate = useNavigate();
  const { staffId } = useParams();
  const { errorNotification, successNotification } = useNotification();

  const {
    isLoading: isCreateLoading,
    execute: executeCreate,
    isSuccess: isCreateSuccess,
    error: isCreateError,
  } = useCreateStaff();

  const {
    isLoading: isUpdateLoading,
    execute: executeUpdate,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdateStaff({ staffId: Number(staffId) });

  const { isLoading: isGetInfoLoading, data: response } = useGetStaffInfo({
    staffId: Number(staffId),
  });

  const initialData = useMemo(() => response?.data ?? {}, [response?.data]);

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.NAME]: initialData?.name ?? "",
        [FORM_FIELDS.EMAIL]: initialData?.email ?? "",
        [FORM_FIELDS.PHONE]: initialData?.phone ?? "",
        [FORM_FIELDS.ADDRESS]: initialData?.address ?? "",
        [FORM_FIELDS.CITY]: initialData?.city ?? "",
        [FORM_FIELDS.STATE]: initialData?.state ?? "",
        [FORM_FIELDS.DISTRICT]: initialData?.district ?? "",
        [FORM_FIELDS.LOGO]: initialData?.logo ?? "",
        [FORM_FIELDS.STATUS]: initialData?.status ?? false,
      },
      validationSchema: object({
        [FORM_FIELDS.NAME]: string().required("This is a Required field."),
        [FORM_FIELDS.EMAIL]: string()
          .email()
          .required("This is a Required field."),
        [FORM_FIELDS.PHONE]: string().required("This is a Required field."),
      }),
      onSubmit: (values) => {
        console.log("Form submitted ", values);
        if (staffId) {
          executeUpdate(values);
          return;
        }
        executeCreate(values);
      },
    });

  const getFieldError = useCallback(
    (fieldName: FORM_FIELDS) => {
      return touched[fieldName] ? (errors[fieldName] as string) : undefined;
    },
    [errors, touched]
  );

  useEffect(() => {
    if (isCreateSuccess) {
      successNotification();
      navigate("/staff");
    }
    if (isCreateError) {
      errorNotification();
    }
  }, [
    errorNotification,
    isCreateError,
    isCreateSuccess,
    navigate,
    successNotification,
  ]);

  useEffect(() => {
    if (isUpdateSuccess) {
      successNotification();
    }
    if (isUpdateError) {
      errorNotification();
    }
  }, [errorNotification, isUpdateError, isUpdateSuccess, successNotification]);

  return (
    <div className="flex flex-col gap-6">
      <TabHeader label="Add Staff" />
      <div className="flex flex-col bg-white rounded-md py-[42px] px-[34px]">
        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Staff Name"
              placeholder="Enter Staff Name"
              name={FORM_FIELDS.NAME}
              value={values[FORM_FIELDS.NAME] as string}
              error={getFieldError(FORM_FIELDS.NAME)}
              onChange={handleChange}
              disabled={isUpdateLoading}
              required
            />

            <Input
              label="Staff Email"
              placeholder="Enter Staff Email"
              name={FORM_FIELDS.EMAIL}
              value={values[FORM_FIELDS.EMAIL] as string}
              error={getFieldError(FORM_FIELDS.EMAIL)}
              onChange={handleChange}
              disabled={isUpdateLoading}
              required
            />

            <Input
              type="number"
              label="Staff Contact No."
              placeholder="Enter Staff Contact No."
              name={FORM_FIELDS.PHONE}
              value={values[FORM_FIELDS.PHONE] as string}
              error={getFieldError(FORM_FIELDS.PHONE)}
              onChange={handleChange}
              disabled={isUpdateLoading}
              required
            />

            <Input
              label="Address"
              placeholder="Enter Address"
              name={FORM_FIELDS.ADDRESS}
              value={values[FORM_FIELDS.ADDRESS] as string}
              error={getFieldError(FORM_FIELDS.ADDRESS)}
              onChange={handleChange}
              disabled={isUpdateLoading}
            />

            <Select
              label="State"
              showSearch
              placeholder="State"
              optionFilterProp="label"
              options={states}
              name={FORM_FIELDS.STATE}
              value={values[FORM_FIELDS.STATE] as string}
              error={errors[FORM_FIELDS.STATE] as string}
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
              value={values[FORM_FIELDS.DISTRICT] as string}
              error={errors[FORM_FIELDS.DISTRICT] as string}
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
              value={values[FORM_FIELDS.CITY] as string}
              name={FORM_FIELDS.CITY}
              error={errors[FORM_FIELDS.CITY] as string}
              onChange={(val: string) =>
                setFieldValue(`${FORM_FIELDS.CITY}`, val)
              }
            />

            <Toggle
              label="Status"
              checked={values[FORM_FIELDS.STATUS] as boolean}
              onToggle={(val) => [setFieldValue(FORM_FIELDS.STATUS, val)]}
              showToggleStatus
            />

            <UploadImage
              label="Institute Logo"
              error={getFieldError(FORM_FIELDS.LOGO)}
              value={values[FORM_FIELDS.LOGO] as unknown as string}
              onChange={(value) => setFieldValue(FORM_FIELDS.LOGO, value)}
            />
          </div>

          <div className="flex items-center mt-6 gap-3">
            <Button
              className="min-w-24 h-12 rounded-lg"
              danger
              disabled={isUpdateLoading || isCreateLoading}
              onClick={() => navigate("/staff")}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="min-w-24 h-12 rounded-lg"
              htmlType="submit"
              disabled={isUpdateLoading || isCreateLoading}
              loading={isUpdateLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStaff;
