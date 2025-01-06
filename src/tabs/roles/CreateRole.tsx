import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Button, Checkbox, notification } from "antd";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import { useGetModule } from "src/apps/super-admin/tabs/modules/apis";
import Input from "src/components/inputs/Input";
import HorizontalSeparator from "src/components/seperators/HorizontalSeperator";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { object, string } from "yup";
import {
  useCreateRoleAndPermission,
  useGetRoleAndPermission,
  useUpdateRoleAndPermission,
} from "./apis";

const FORM_FIELDS = {
  NAME: "name",
};

const options = [
  { label: "Read", value: 1 },
  { label: "Write", value: 2 },
  { label: "Delete", value: 3 },
];

const CreateRole = () => {
  useSetActiveTab(TAB_NAMES.ROLES);
  const navigate = useNavigate();
  const { roleId } = useParams();
  const [api, contextHolder] = notification.useNotification();

  const { isLoading: isGetInProgress, data, error } = useGetModule();
  const modules = useMemo(() => data?.data ?? [], [data?.data]);

  const {
    inProgress: isCreateInProgress,
    execute: handleRoleCreate,
    isSuccess: isCreateSucceed,
  } = useCreateRoleAndPermission();
  const { execute: handleRoleUpdate, isSuccess: isUpdateSucceed } =
    useUpdateRoleAndPermission();

  //get roles
  const { data: rolesAndPermissionsRes } = useGetRoleAndPermission(
    Number(roleId),
    !!roleId
  );
  const rolesAndPermissionData = useMemo(
    () => rolesAndPermissionsRes?.data ?? [],
    [rolesAndPermissionsRes?.data]
  );

  const mappedRoleAndPermission = useMemo(() => {
    return rolesAndPermissionData?.permissions?.map((item: any) => {
      return {
        name: item.moduleName,
        permissions: item.moduleAccess?.map((mod: any) => Number(mod.access)),
      };
    });
  }, [rolesAndPermissionData?.permissions]);

  const [permissions, setPermissions] = useState<
    { name: string; permissions: number[] }[]
  >(
    mappedRoleAndPermission ?? ([] as { name: string; permissions: number[] }[])
  );

  const { values, errors, handleSubmit, handleChange } = useFormik({
    enableReinitialize: true,
    initialValues: {
      [FORM_FIELDS.NAME]: rolesAndPermissionData?.name ?? "",
    },
    validationSchema: object({
      [FORM_FIELDS.NAME]: string().required("This is a Required field."),
    }),
    onSubmit: ({ name }) => {
      if (permissions.every((item) => item?.permissions?.length === 0)) {
        api.error({
          message: "Assign some permissions to it",
          duration: 5,
        });
        return;
      }
      if (roleId) {
        handleRoleUpdate({ name, permissions, roleId });
        return;
      }
      handleRoleCreate({ name, permissions });
    },
  });

  const handleSetPermissions = useCallback(
    (moduleName: string, permissionValues: number[]) => {
      if (permissions?.find((item) => item.name === moduleName)) {
        setPermissions((prev) => [
          ...prev?.filter((item) => item.name !== moduleName),
          { name: moduleName, permissions: permissionValues },
        ]);
      } else {
        setPermissions((prev) => [
          ...(prev ?? []),
          { name: moduleName, permissions: permissionValues },
        ]);
      }
    },
    [permissions]
  );

  useEffect(() => {
    setPermissions(mappedRoleAndPermission);
  }, [mappedRoleAndPermission]);

  useEffect(() => {
    if (isCreateSucceed || isUpdateSucceed) {
      api.success({
        message: "Role updated",
        duration: 5,
      });
      navigate("/roles");
    }
  }, [api, isCreateSucceed, isUpdateSucceed, navigate]);

  return (
    <>
      {contextHolder}
      <div className="flex flex-col bg-white w-full rounded-xl">
        <div className="text-xl font-bold flex justify-between items-center p-5">
          <div className="flex items-center gap-4">
            <div
              className="rounded-full h-10 w-10 flex p-3 justify-center items-center bg-[#F4F7FE] cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <ChevronLeftIcon />
            </div>
            <span>Add Role</span>
          </div>
          <Button type="primary" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </div>
        <HorizontalSeparator />
        <div className="flex flex-col gap-3 p-5">
          <Input
            label="Enter Role Name"
            name={FORM_FIELDS.NAME}
            value={values[FORM_FIELDS.NAME]}
            error={errors[FORM_FIELDS.NAME] as string}
            onChange={handleChange}
            // disabled={inProgress}
          />

          <div className="mt-5 font-semibold">Select Module Permissions</div>
          <HorizontalSeparator />
          <div className="flex flex-col gap-4">
            {modules.map(({ value, label }) => {
              const localStateAccess =
                permissions?.find((item: any) => {
                  return item.name === value;
                })?.permissions ?? [];

              return (
                <div key={value} className="grid grid-cols-2 gap-5">
                  <span className="text-sm">{label}</span>
                  <Checkbox.Group
                    value={localStateAccess}
                    options={options}
                    onChange={(access) => {
                      handleSetPermissions(value, access);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRole;
