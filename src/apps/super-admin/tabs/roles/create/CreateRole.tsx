import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import ButtonV1 from "src/components/buttons/ButtonV1";
import Input from "src/components/inputs/Input";
import ToggleWithLabel from "src/components/toggles/Toggle";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { object, string } from "yup";
import { useCreateRole, useGetRoleData, useUpdateRole } from "../api-clients";
import RolePermissionCard, { PermissionsDataType } from "./RolePermissionCard";

const FORM_FIELDS = {
  NAME: "name",
  PERMISSIONS: "permissions",
  STATUS: "active",
};

const CreateRole = ({
  isInViewMode = false,
  onSuccess,
}: {
  isInViewMode?: boolean;
  onSuccess?: () => void;
}) => {
  useSetActiveTab(TAB_NAMES.ROLES);
  const { roleId: id } = useParams();

  const roleId = useMemo(() => Number(id), [id]);

  const isInEditMode = useMemo(() => !!roleId, [roleId]);

  const { errorNotification, successNotification } = useNotification();

  const { isLoading: isGetPlanLoading, data } = useGetRoleData(roleId);

  const planData = useMemo(() => data?.data ?? {}, [data?.data]);

  const {
    isLoading: isUpdateLoading,
    execute: updatePlan,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdateRole(roleId);

  const { isLoading, isSuccess, execute, error } = useCreateRole();

  const { values, errors, handleSubmit, setFieldValue, touched } = useFormik({
    enableReinitialize: true,
    initialValues: {
      [FORM_FIELDS.NAME]: planData?.[FORM_FIELDS.NAME] ?? "",
      [FORM_FIELDS.STATUS]: planData?.[FORM_FIELDS.STATUS] ?? false,
      [FORM_FIELDS.PERMISSIONS]: planData?.[FORM_FIELDS.PERMISSIONS] ?? {},
    },
    validationSchema: object({
      [FORM_FIELDS.NAME]: string().required("This is a Required field."),
    }),
    onSubmit: (data) => {
      if (isInEditMode) {
        updatePlan(data);
        return;
      }
      execute(data);
    },
  });

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      successNotification(isUpdateSuccess ? "Role Updated" : "Role Created.");
      onSuccess?.();
    }
  }, [isSuccess, isUpdateSuccess, onSuccess, successNotification]);

  useEffect(() => {
    if (error || isUpdateError) {
      errorNotification();
    }
  }, [error, errorNotification, isUpdateError]);

  const isInLoading = useMemo(
    () => isLoading || isGetPlanLoading || isUpdateLoading,
    [isGetPlanLoading, isLoading, isUpdateLoading]
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
      <TabHeader label="Add New Role" />
      <div className="flex flex-col justify-between gap-6 bg-white rounded-md py-3 md:py-[30px] px-4 md:px-[42px] h-fit">
        <div className="grid grid-cols-1 gap-[30px] w-full md:w-1/2">
          <Input
            label="Role Name"
            placeholder="Role Name"
            name={FORM_FIELDS.NAME}
            value={values[FORM_FIELDS.NAME] as string}
            error={getFieldError(FORM_FIELDS.NAME)}
            onChange={(e) => setFieldValue(FORM_FIELDS.NAME, e.target.value)}
            required
            disabled={isFieldDisabled}
          />
          <RolePermissionCard
            selectedPermissions={
              values[FORM_FIELDS.PERMISSIONS] as PermissionsDataType
            }
            setSelectedPermissions={(permissions) =>
              setFieldValue(FORM_FIELDS.PERMISSIONS, permissions)
            }
          />
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

export default CreateRole;
