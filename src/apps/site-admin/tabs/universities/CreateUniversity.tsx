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
import {
  useCreateUniversity,
  useGetUniversityInfo,
  useUpdateUniversity,
} from "./api-client";

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

const CreateUniversity = () => {
  useSetActiveTab(TAB_NAMES.UNIVERSITY);
  const navigate = useNavigate();
  const { uniId } = useParams();
  const { errorNotification, successNotification } = useNotification();

  const {
    isLoading: isCreateLoading,
    execute: createUniversity,
    isSuccess: isCreateSuccess,
    error: isCreateError,
  } = useCreateUniversity();

  const {
    isLoading: isUpdateLoading,
    execute: updateUniversity,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdateUniversity({ uniId: Number(uniId) });

  const { isLoading: isGetInfoLoading, data: universityRes } =
    useGetUniversityInfo({ uniId: Number(uniId) });

  const uniData = useMemo(
    () => universityRes?.data ?? {},
    [universityRes?.data]
  );

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.NAME]: uniData?.name ?? "",
        [FORM_FIELDS.EMAIL]: uniData?.email ?? "",
        [FORM_FIELDS.PHONE]: uniData?.phone ?? "",
        [FORM_FIELDS.ADDRESS]: uniData?.address ?? "",
        [FORM_FIELDS.CITY]: uniData?.city ?? "",
        [FORM_FIELDS.STATE]: uniData?.state ?? "",
        [FORM_FIELDS.DISTRICT]: uniData?.district ?? "",
        [FORM_FIELDS.LOGO]: uniData?.logo ?? "",
        [FORM_FIELDS.STATUS]: uniData?.status ?? false,
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
        if (uniId) {
          updateUniversity(values);
          return;
        }
        createUniversity(values);
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
      navigate("/universities");
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
      <TabHeader label="Add University" />
      <div className="flex flex-col bg-white rounded-md py-[42px] px-[34px]">
        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="University Name"
              placeholder="Enter University Name"
              name={FORM_FIELDS.NAME}
              value={values[FORM_FIELDS.NAME] as string}
              error={getFieldError(FORM_FIELDS.NAME)}
              onChange={handleChange}
              disabled={isUpdateLoading}
              required
            />

            <Input
              label="University Email"
              placeholder="Enter University Email"
              name={FORM_FIELDS.EMAIL}
              value={values[FORM_FIELDS.EMAIL] as string}
              error={getFieldError(FORM_FIELDS.EMAIL)}
              onChange={handleChange}
              disabled={isUpdateLoading}
              required
            />

            <Input
              type="number"
              label="University Contact No."
              placeholder="Enter University Contact No."
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
              onClick={() => navigate("/universities")}
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

export default CreateUniversity;
