import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import ButtonV1 from "src/components/buttons/ButtonV1";
import Dropdown from "src/components/dropdowns/Dropdown";
import Input from "src/components/inputs/Input";
import ToggleWithLabel from "src/components/toggles/Toggle";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { number, object, string } from "yup";
import cities from "../../../../../utils/cities.json";
import countries from "../../../../../utils/countries.json";
import states from "../../../../../utils/states.json";
import { useCreateUser, useGetUserData, useUpdateUser } from "../api-clients";

const INDIA_COUNTRY_CODE = "IN";

const FORM_FIELDS = {
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
  PHONE: "phone",
  ALTERNATE_PHONE: "alternatePhone",
  ADDRESS: "address",
  CITY: "city",
  STATE: "state",
  COUNTRY: "country",
  STATUS: "active",
};

const CreateUser = ({ isInViewMode = false }: { isInViewMode?: boolean }) => {
  useSetActiveTab(TAB_NAMES.USERS);
  const navigate = useNavigate();
  const { userId: id } = useParams();

  const userId = useMemo(() => Number(id), [id]);

  const isInEditMode = useMemo(() => !!userId, [userId]);

  const { errorNotification, successNotification } = useNotification();

  const { isLoading: isGetUserLoading, data } = useGetUserData(userId);

  const userData = useMemo(() => data?.data ?? {}, [data?.data]);

  const {
    isLoading: isUpdateLoading,
    execute: updateUser,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdateUser(userId);

  const { isLoading, isSuccess, execute, error } = useCreateUser();

  const { values, errors, handleSubmit, setFieldValue, touched } = useFormik({
    enableReinitialize: true,
    initialValues: {
      [FORM_FIELDS.NAME]: userData?.[FORM_FIELDS.NAME] ?? "",
      [FORM_FIELDS.EMAIL]: userData?.[FORM_FIELDS.EMAIL] ?? "",
      [FORM_FIELDS.PASSWORD]: userData?.[FORM_FIELDS.PASSWORD] ?? "",
      [FORM_FIELDS.PHONE]: userData?.[FORM_FIELDS.PHONE] ?? null,
      [FORM_FIELDS.ALTERNATE_PHONE]:
        userData?.[FORM_FIELDS.ALTERNATE_PHONE] ?? null,
      [FORM_FIELDS.ADDRESS]: userData?.[FORM_FIELDS.ADDRESS] ?? "",
      [FORM_FIELDS.CITY]: userData?.[FORM_FIELDS.CITY] ?? "",
      [FORM_FIELDS.STATE]: userData?.[FORM_FIELDS.STATE] ?? "",
      [FORM_FIELDS.COUNTRY]: userData?.[FORM_FIELDS.COUNTRY] ?? "",
      [FORM_FIELDS.STATUS]: userData?.[FORM_FIELDS.STATUS] ?? false,
    },
    validationSchema: object({
      [FORM_FIELDS.NAME]: string().required("This is a Required field."),
      [FORM_FIELDS.PHONE]: number().nullable(),
      [FORM_FIELDS.ALTERNATE_PHONE]: number().nullable(),
      [FORM_FIELDS.EMAIL]: string()
        .email("Please enter valid email.")
        .required("This is a Required field."),
      [FORM_FIELDS.PASSWORD]: string().required("This is a Required field."),
    }),
    onSubmit: (data) => {
      if (isInEditMode) {
        updateUser(data);
        return;
      }
      execute(data);
    },
  });

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      successNotification(isUpdateSuccess ? "User Updated" : "User Created.");
      navigate("/users");
    }
  }, [isSuccess, isUpdateSuccess, navigate, successNotification]);

  useEffect(() => {
    if (error || isUpdateError) {
      errorNotification();
    }
  }, [error, errorNotification, isUpdateError]);

  const countryValue = useMemo(() => values[FORM_FIELDS.COUNTRY], [values]);

  const isInLoading = useMemo(
    () => isLoading || isGetUserLoading || isUpdateLoading,
    [isGetUserLoading, isLoading, isUpdateLoading]
  );

  const isFieldDisabled = useMemo(
    () => isInViewMode || isInLoading,
    [isInLoading, isInViewMode]
  );

  const getFieldError = useCallback(
    (fieldName: string) => {
      return touched[fieldName] ? (errors[fieldName] as string) : undefined;
    },
    [errors, touched]
  );

  return (
    <div className="flex flex-col gap-[20px] h-full">
      <TabHeader label="Create User" />
      <div className="flex flex-col justify-between gap-6 bg-white rounded-md py-[30px] px-[42px] h-fit">
        <div className="grid grid-cols-2 gap-[30px]">
          <Input
            label="Full Name"
            placeholder="Full Name"
            name={FORM_FIELDS.NAME}
            value={values[FORM_FIELDS.NAME] as string}
            error={getFieldError(FORM_FIELDS.NAME)}
            onChange={(e) => setFieldValue(FORM_FIELDS.NAME, e.target.value)}
            required
            disabled={isFieldDisabled}
          />
          <Input
            type="email"
            label="Email"
            placeholder="Email"
            name={FORM_FIELDS.EMAIL}
            value={values[FORM_FIELDS.EMAIL] as string}
            error={getFieldError(FORM_FIELDS.EMAIL)}
            onChange={(e) => setFieldValue(FORM_FIELDS.EMAIL, e.target.value)}
            disabled={isFieldDisabled}
            required
          />
          <Input
            label="Password"
            placeholder="Password"
            name={FORM_FIELDS.PASSWORD}
            value={values[FORM_FIELDS.PASSWORD] as string}
            error={getFieldError(FORM_FIELDS.PASSWORD)}
            onChange={(e) =>
              setFieldValue(FORM_FIELDS.PASSWORD, e.target.value)
            }
            disabled={isFieldDisabled}
            required
          />
          <Input
            type="number"
            label="Phone Number"
            placeholder="Phone Number"
            name={FORM_FIELDS.PHONE}
            value={values[FORM_FIELDS.PHONE] as string}
            error={getFieldError(FORM_FIELDS.PHONE)}
            onChange={(e) => setFieldValue(FORM_FIELDS.PHONE, e.target.value)}
            disabled={isFieldDisabled}
          />
          <Input
            type="number"
            label="Alternate Phone"
            placeholder="Alternate Phone"
            name={FORM_FIELDS.ALTERNATE_PHONE}
            value={values[FORM_FIELDS.ALTERNATE_PHONE] as string}
            error={getFieldError(FORM_FIELDS.ALTERNATE_PHONE)}
            onChange={(e) =>
              setFieldValue(FORM_FIELDS.ALTERNATE_PHONE, e.target.value)
            }
            disabled={isFieldDisabled}
          />
          <Input
            label="Address"
            placeholder="Address"
            name={FORM_FIELDS.ADDRESS}
            value={values[FORM_FIELDS.ADDRESS] as string}
            error={getFieldError(FORM_FIELDS.ADDRESS)}
            onChange={(e) => setFieldValue(FORM_FIELDS.ADDRESS, e.target.value)}
            disabled={isFieldDisabled}
          />
          <div className="grid grid-cols-3 gap-[30px]">
            <Dropdown
              label="Country"
              className={"w-full"}
              options={countries}
              value={countryValue as string}
              onChange={(val) => setFieldValue(FORM_FIELDS.COUNTRY, val)}
              disabled={isFieldDisabled}
            />
            {[INDIA_COUNTRY_CODE, ""].includes(countryValue as string) && (
              <>
                <Dropdown
                  label="State"
                  className="w-full"
                  options={states}
                  value={values[FORM_FIELDS.STATE] as string}
                  onChange={(val) => setFieldValue(FORM_FIELDS.STATE, val)}
                  disabled={isFieldDisabled}
                />
                <Dropdown
                  label="City"
                  className="w-full"
                  options={cities}
                  value={values[FORM_FIELDS.CITY] as string}
                  onChange={(val) => setFieldValue(FORM_FIELDS.CITY, val)}
                  disabled={isFieldDisabled}
                />
              </>
            )}
          </div>
          <ToggleWithLabel
            label="Status"
            checked={values[FORM_FIELDS.STATUS] as boolean}
            onToggle={(val) => [setFieldValue(FORM_FIELDS.STATUS, val)]}
            disabled={isFieldDisabled}
            showToggleStatus
          />
        </div>
        <ButtonV1
          text={isLoading ? "Loading..." : "Submit"}
          onClick={handleSubmit}
          primary
          className="h-[40px] px-10"
          isDisabled={isFieldDisabled}
        />
      </div>
    </div>
  );
};

export default CreateUser;
