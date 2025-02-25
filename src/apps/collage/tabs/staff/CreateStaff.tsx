import dayjs from "dayjs";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import Button from "src/components/buttons/Button";
import DatePicker from "src/components/calendar/DatePicker";
import UploadImage from "src/components/image-upload/UploadImage";
import Input from "src/components/inputs/Input";
import Select from "src/components/select/Select";
import Toggle from "src/components/toggles/Toggle";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { GENDERS, STAFF_OPTIONS } from "src/utils/constants";
import { number, object, string } from "yup";
import { useCreateStaff, useGetStaffInfo, useUpdateStaff } from "./api-client";

enum FORM_FIELDS {
  NAME = "name",
  EMAIL = "email",
  PHONE = "phone",
  ROLE = "role",
  DEPARTMENT = "department",
  DESIGNATION = "designation",
  GENDER = "gender",
  AADHAR_CARD = "aadhar",
  ADDRESS = "address",
  LOGO = "logo",
  STATUS = "active",
  DOB = "dob",
  DOJ = "doj",
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
        [FORM_FIELDS.ROLE]: initialData?.role ?? undefined,
        [FORM_FIELDS.DEPARTMENT]: initialData?.department ?? "",
        [FORM_FIELDS.DESIGNATION]: initialData?.designation ?? "",
        [FORM_FIELDS.DOB]: initialData?.dob ?? null,
        [FORM_FIELDS.DOJ]: initialData?.doj ?? null,
        [FORM_FIELDS.GENDER]: initialData?.gender ?? undefined,
        [FORM_FIELDS.AADHAR_CARD]: initialData?.aadhar ?? "",
        [FORM_FIELDS.ADDRESS]: initialData?.address ?? "",
        [FORM_FIELDS.LOGO]: initialData?.logo ?? "",
        [FORM_FIELDS.STATUS]: initialData?.active ?? false,
      },
      validationSchema: object({
        [FORM_FIELDS.NAME]: string().required("This is a Required field."),
        [FORM_FIELDS.EMAIL]: string()
          .email()
          .required("This is a Required field."),
        [FORM_FIELDS.PHONE]: string().required("This is a Required field."),
        [FORM_FIELDS.ROLE]: number().required("This is a Required field."),
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

            <Select
              label="Role"
              showSearch
              placeholder="Role"
              optionFilterProp="label"
              options={STAFF_OPTIONS}
              name={FORM_FIELDS.ROLE}
              value={values[FORM_FIELDS.ROLE] as string}
              error={errors[FORM_FIELDS.ROLE] as string}
              onChange={(val: string) =>
                setFieldValue(`${FORM_FIELDS.ROLE}`, val)
              }
              required
            />

            <Select
              label="Gender"
              showSearch
              placeholder="Gender"
              optionFilterProp="label"
              options={GENDERS}
              name={FORM_FIELDS.GENDER}
              value={values[FORM_FIELDS.GENDER] as string}
              error={errors[FORM_FIELDS.GENDER] as string}
              onChange={(val: string) =>
                setFieldValue(`${FORM_FIELDS.GENDER}`, val)
              }
            />

            <Input
              type="number"
              label="Aadhar Card No."
              placeholder="Enter Aadhar No."
              name={FORM_FIELDS.AADHAR_CARD}
              value={values[FORM_FIELDS.AADHAR_CARD] as string}
              error={getFieldError(FORM_FIELDS.AADHAR_CARD)}
              onChange={handleChange}
              disabled={isUpdateLoading}
            />

            <Input
              label="Department"
              placeholder="Enter Department"
              name={FORM_FIELDS.DEPARTMENT}
              value={values[FORM_FIELDS.DEPARTMENT] as string}
              error={getFieldError(FORM_FIELDS.DEPARTMENT)}
              onChange={handleChange}
              disabled={isUpdateLoading}
            />

            <Input
              label="Designation"
              placeholder="Enter Designation"
              name={FORM_FIELDS.DESIGNATION}
              value={values[FORM_FIELDS.DESIGNATION] as string}
              error={getFieldError(FORM_FIELDS.DESIGNATION)}
              onChange={handleChange}
              disabled={isUpdateLoading}
            />

            <DatePicker
              label="Date Of Birth"
              name={FORM_FIELDS.DOB}
              value={
                values[FORM_FIELDS.DOB] ? dayjs(values[FORM_FIELDS.DOB]) : null
              }
              error={getFieldError(FORM_FIELDS.DOB)}
              onChange={(value) => setFieldValue(FORM_FIELDS.DOB, value)}
              disabled={isUpdateLoading}
            />

            <DatePicker
              label="Date Of Joining"
              name={FORM_FIELDS.DOJ}
              value={
                values[FORM_FIELDS.DOJ] ? dayjs(values[FORM_FIELDS.DOJ]) : null
              }
              error={getFieldError(FORM_FIELDS.DOJ)}
              onChange={(value) => setFieldValue(FORM_FIELDS.DOJ, value)}
              disabled={isUpdateLoading}
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

            <Toggle
              label="Status"
              checked={values[FORM_FIELDS.STATUS] as boolean}
              onToggle={(val) => [setFieldValue(FORM_FIELDS.STATUS, val)]}
              showToggleStatus
            />

            <UploadImage
              label="Staff Image"
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
