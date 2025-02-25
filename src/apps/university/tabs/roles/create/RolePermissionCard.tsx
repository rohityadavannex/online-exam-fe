import { isEqual } from "lodash";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { CheckBoxIcon } from "src/icons/CheckboxIcon";
import { getCurrentUserInfo, getPlanAccess } from "src/redux/selectors/app";
import { ROLE_PERMISSION_FEATURES, ROLES } from "src/utils/constants";

enum PermissionType {
  READ = "read",
  WRITE = "write",
  DELETE = "delete",
}
export type PermissionsDataType = Record<string, PermissionType[]>;

const RolePermissionCard = ({
  selectedPermissions = {},
  setSelectedPermissions,
}: {
  selectedPermissions: PermissionsDataType;
  setSelectedPermissions: React.Dispatch<
    React.SetStateAction<PermissionsDataType>
  >;
}) => {
  const userInfo = useSelector(getCurrentUserInfo);
  const planAccess = useSelector(getPlanAccess);

  const filteredRolePermissionFeatures = useMemo(
    () =>
      ROLE_PERMISSION_FEATURES.filter(({ value }) =>
        planAccess.find(({ name }: { name: string }) => value === name)
      ),
    [planAccess]
  );

  const roleWiseFeatures = useMemo(
    () =>
      userInfo?.role === ROLES.UNIVERSITY
        ? ROLE_PERMISSION_FEATURES
        : filteredRolePermissionFeatures,
    [filteredRolePermissionFeatures, userInfo?.role]
  );

  const handleToggle = useCallback(
    (feature: string, permission: PermissionType) => {
      const currentFeature = selectedPermissions?.[feature];
      if (currentFeature) {
        if (currentFeature.includes(permission)) {
          selectedPermissions[feature] = currentFeature.filter(
            (item) => item !== permission
          );
        } else {
          selectedPermissions[feature] = [...currentFeature, permission];
        }
      } else {
        selectedPermissions[feature] = [permission];
      }

      //check the features with zero permissions and remove them
      Object.keys(selectedPermissions).forEach((item) => {
        if (selectedPermissions[item].length === 0) {
          delete selectedPermissions[item];
        }
      });
      setSelectedPermissions(selectedPermissions);
    },
    [selectedPermissions, setSelectedPermissions]
  );

  const isAllSelected = useMemo(() => {
    return isEqual(selectedPermissions, getAllPermissions());
  }, [selectedPermissions]);

  const handleAllSelectClick = useCallback(() => {
    setSelectedPermissions(isAllSelected ? {} : getAllPermissions());
  }, [isAllSelected, setSelectedPermissions]);

  const isSelected = useCallback(
    (feature: string, type: PermissionType) => {
      const permissionData = selectedPermissions?.[feature];
      if (!permissionData) return false;
      return !!permissionData.includes(type);
    },
    [selectedPermissions]
  );

  return (
    <div className="flex flex-col border-[1px] p-2 md:p-[20px] rounded-md min-w-full md:min-w-[600px] gap-4">
      <div className="flex justify-between gap-4 items-center">
        <div className="font-semibold text-lg">Permission</div>
        <div className="flex items-center gap-2">
          <CheckBoxIcon
            checked={isAllSelected}
            onClick={handleAllSelectClick}
          />{" "}
          <span className="font-semibold text-sm">Select All</span>
        </div>
      </div>
      <table className="border-0">
        <thead className="border-b-[1px] mb-3">
          <tr>
            <td className="font-semibold text-sm">Administrator Access</td>
            <td className="font-semibold text-sm">Read</td>
            <td className="font-semibold text-sm">Write</td>
            <td className="font-semibold text-sm">Delete</td>
          </tr>
        </thead>
        <tbody className="mt-3">
          {roleWiseFeatures?.map(({ label, value }) => {
            return (
              <tr key={value} className="border-none">
                <td className="font-semibold text-sm select-none">{label}</td>
                <td>
                  <CheckBoxIcon
                    checked={isSelected(value, PermissionType.READ)}
                    onClick={() => handleToggle(value, PermissionType.READ)}
                  />
                </td>
                <td>
                  <CheckBoxIcon
                    checked={isSelected(value, PermissionType.WRITE)}
                    onClick={() => handleToggle(value, PermissionType.WRITE)}
                  />
                </td>
                <td>
                  <CheckBoxIcon
                    checked={isSelected(value, PermissionType.DELETE)}
                    onClick={() => handleToggle(value, PermissionType.DELETE)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RolePermissionCard;

function getAllPermissions() {
  const allPermissions: PermissionsDataType = {};

  ROLE_PERMISSION_FEATURES.forEach(({ value }) => {
    allPermissions[value] = [
      PermissionType.READ,
      PermissionType.WRITE,
      PermissionType.DELETE,
    ];
  });

  return allPermissions;
}
