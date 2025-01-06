import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import ButtonV1 from "src/components/buttons/ButtonV1";
import UploadProfileImage from "src/components/image-upload/UploadProfileImage";
import Input from "src/components/inputs/Input";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import {
  getCurrentUserInfo,
  isUserInfoInProgress,
} from "src/redux/selectors/app";
import SearchList from "src/components/search-list/SearchList";
import useNotification from "src/hooks/useNotification";
import useUserPlace from "src/hooks/useUserPlace";
import { userInfoRequestSucceed } from "src/redux/actions/app";
import { ADDRESS } from "src/utils/constants";
import { object, string } from "yup";
import { useUpdateProfile } from "../api-profile";

const FORM_FIELDS = {
  IMAGE: "image",
  NAME: "name",
  EMAIL: "email",
  PHONE: "phone",
  ADDRESS: "address",
  CITY: "city",
  STATE: "state",
  COUNTRY: "country",
};

const EditProfile = () => {
  useSetActiveTab(TAB_NAMES.EDIT_PROFILE_SETTINGS);

  const dispatch = useDispatch();

  const { successNotification, errorNotification } = useNotification();

  const { getUserPlaceByType, handleSearchByType } = useUserPlace();
  const isLoading = useSelector(isUserInfoInProgress);
  const currentUserInfo = useSelector(getCurrentUserInfo);

  const {
    isLoading: isUpdateLoading,
    execute: updateProfile,
    error,
    isSuccess,
    data: updatedProfile,
  } = useUpdateProfile();

  useEffect(() => {
    if (isSuccess) {
      successNotification("Profile Updated.");
      dispatch(userInfoRequestSucceed(updatedProfile.data));
    } else if (error) {
      errorNotification("Something went wrong!!");
    }
  }, [
    dispatch,
    error,
    errorNotification,
    isSuccess,
    successNotification,
    updatedProfile,
  ]);

  const { values, touched, errors, setFieldValue, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      [FORM_FIELDS.IMAGE]: currentUserInfo?.[FORM_FIELDS.IMAGE],
      [FORM_FIELDS.NAME]: currentUserInfo?.[FORM_FIELDS.NAME] ?? "",
      [FORM_FIELDS.EMAIL]: currentUserInfo?.[FORM_FIELDS.EMAIL] ?? "",
      [FORM_FIELDS.PHONE]: currentUserInfo?.[FORM_FIELDS.PHONE] ?? "",
      [FORM_FIELDS.ADDRESS]: currentUserInfo?.[FORM_FIELDS.ADDRESS] ?? "",
      [FORM_FIELDS.CITY]: currentUserInfo?.[FORM_FIELDS.CITY] ?? "",
      [FORM_FIELDS.STATE]: currentUserInfo?.[FORM_FIELDS.STATE] ?? "",
      [FORM_FIELDS.COUNTRY]: currentUserInfo?.[FORM_FIELDS.COUNTRY] ?? "",
    },
    validationSchema: object({
      [FORM_FIELDS.NAME]: string().required("This is a Required field."),
      [FORM_FIELDS.EMAIL]: string()
        .email("Please enter valid email.")
        .required("This is a Required field."),
      [FORM_FIELDS.PHONE]: string().required("This is a Required field."),
    }),
    onSubmit: (data) => {
      delete data.email;
      updateProfile(data);
    },
  });

  const getFieldError = useCallback(
    (fieldName: string) => {
      return touched[fieldName] ? (errors[fieldName] as string) : undefined;
    },
    [errors, touched]
  );

  const isFieldDisabled = useMemo(
    () => isLoading || isUpdateLoading,
    [isLoading, isUpdateLoading]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
      <div className="col-span-2">
        <UploadProfileImage
          name={FORM_FIELDS.IMAGE}
          label=""
          value={values[FORM_FIELDS.IMAGE]}
          onChange={(file) => setFieldValue(FORM_FIELDS.IMAGE, file)}
          error={getFieldError(FORM_FIELDS.IMAGE)}
          onClear={() => {
            if (typeof values[FORM_FIELDS.IMAGE] === "string") {
              return;
            }
            setFieldValue(FORM_FIELDS.IMAGE, null);
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] col-span-10">
        <Input
          label="Name"
          placeholder="Name"
          name={FORM_FIELDS.NAME}
          value={values[FORM_FIELDS.NAME] as string}
          error={getFieldError(FORM_FIELDS.NAME)}
          onChange={(e) => setFieldValue(FORM_FIELDS.NAME, e.target.value)}
          disabled={isFieldDisabled}
          required
        />

        <Input
          label="Email"
          placeholder="Email"
          name={FORM_FIELDS.EMAIL}
          value={values[FORM_FIELDS.EMAIL] as string}
          error={getFieldError(FORM_FIELDS.EMAIL)}
          onChange={(e) => setFieldValue(FORM_FIELDS.EMAIL, e.target.value)}
          disabled
          required
        />

        <Input
          label="Phone"
          placeholder="Phone"
          name={FORM_FIELDS.PHONE}
          value={values[FORM_FIELDS.PHONE] as string}
          error={getFieldError(FORM_FIELDS.PHONE)}
          onChange={(e) => setFieldValue(FORM_FIELDS.PHONE, e.target.value)}
          disabled={isFieldDisabled}
          required
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

        <SearchList
          label="City"
          onSearch={(val) => handleSearchByType(val, ADDRESS.CITY)}
          value={getUserPlaceByType(values[FORM_FIELDS.CITY], ADDRESS.CITY)}
          onChange={(val) => setFieldValue(FORM_FIELDS.CITY, val)}
          disabled={isFieldDisabled}
          placeholder="Enter City"
          inputClassName="rounded-[5px]"
        />
        <SearchList
          label="State"
          onSearch={(val) => handleSearchByType(val, ADDRESS.STATE)}
          value={getUserPlaceByType(values[FORM_FIELDS.STATE], ADDRESS.STATE)}
          onChange={(val) => setFieldValue(FORM_FIELDS.STATE, val)}
          disabled={isFieldDisabled}
          placeholder="Enter State"
          inputClassName="rounded-[5px]"
        />
        <SearchList
          label="Country"
          onSearch={(val) => handleSearchByType(val, ADDRESS.COUNTRY)}
          value={getUserPlaceByType(
            values[FORM_FIELDS.COUNTRY],
            ADDRESS.COUNTRY
          )}
          onChange={(val) => setFieldValue(FORM_FIELDS.COUNTRY, val)}
          disabled={isFieldDisabled}
          placeholder="Enter Country"
          inputClassName="rounded-[5px]"
        />
      </div>
      <ButtonV1
        text={isLoading || isUpdateLoading ? "Loading..." : "Submit"}
        onClick={handleSubmit}
        primary
        className="h-[40px] !px-16 mt-[30px]"
        isDisabled={isFieldDisabled}
      />
    </div>
  );
};

export default EditProfile;
