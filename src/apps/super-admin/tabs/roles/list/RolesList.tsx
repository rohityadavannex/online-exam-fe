import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import ConfirmationModal from "src/components/modals/ConfirmationModal";
import ReactTable from "src/components/tables/react-table/ReactTable";
import { getFormattedDate, handleCsvExport } from "src/helpers/helpers";
import useDebounce from "src/hooks/useDebounce";
import useManualRefresh from "src/hooks/useManualRefresh";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { ROLE_PERMISSION_FEATURES } from "src/utils/constants";
import {
  useDeleteRole,
  useGetRoles,
  useUpdateRoleStatus,
} from "../api-clients";
import { RoleType } from "./role-types";
import useRolesTableColumns from "./useRolesTableColumns";

const RolesList = () => {
  useSetActiveTab(TAB_NAMES.ROLES);
  const navigate = useNavigate();
  const [length, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);
  const { successNotification, errorNotification } = useNotification();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToOperate, setIdToOperate] = useState<number | undefined>(undefined);
  const { execute: handleRoleStatusChange, isSuccess: isStatusUpdateSuccess } =
    useUpdateRoleStatus();
  const {
    isLoading,
    error,
    data,
    mutate: updateRoleData,
    isValidating,
  } = useGetRoles({ length, page, search: debouncedSearch });
  const { isRefreshing, handleRefresh } = useManualRefresh(updateRoleData);

  const {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSucceed,
    error: deleteErr,
    execute: deleteRole,
  } = useDeleteRole();

  const rolesData = useMemo(() => data?.data?.rows ?? [], [data?.data]);

  const mappedRolesData = useMemo(() => {
    return rolesData.map((role: RoleType) => {
      return {
        ...role,
        permissions: role.permissions.map(
          (value) =>
            ROLE_PERMISSION_FEATURES.find((item) => value === item.value)?.label
        ),
        createdAt: getFormattedDate(role.createdAt),
        updatedAt: getFormattedDate(role.updatedAt),
      };
    });
  }, [rolesData]);

  const totalRecords = useMemo(() => data?.data?.count, [data?.data?.count]);

  const columns = useRolesTableColumns({
    onDelete: (id: number) => {
      setIdToOperate(id);
      setIsDeleteModalOpen(true);
    },
    handleRoleStatusChange,
  });

  useEffect(() => {
    if (isDeleteSucceed) {
      updateRoleData();
      setIsDeleteModalOpen(false);
      successNotification("Role Deleted.");
    }
  }, [isDeleteSucceed, successNotification, updateRoleData]);

  useEffect(() => {
    if (deleteErr) {
      errorNotification();
    }
  }, [deleteErr, errorNotification]);

  useEffect(() => {
    if (isStatusUpdateSuccess) {
      updateRoleData();
    }
  }, [isStatusUpdateSuccess, updateRoleData]);

  return (
    <>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        isLoading={isDeleteLoading}
        onSubmit={() => deleteRole(idToOperate)}
      />
      <div className="flex flex-col gap-[20px]">
        <TabHeader
          label="Roles Management"
          onRefresh={() => handleRefresh()}
          exportButton={{
            label: "Export",
            onClick: () => handleCsvExport(mappedRolesData),
          }}
          printButton={{
            label: "Print",
            onClick: () => window.print(),
          }}
          createButton={{
            label: "Create New Role",
            onClick: () => navigate("create"),
          }}
          search={{
            onChange: (val) => setSearchText(val),
            value: searchText,
          }}
        />
        <ReactTable
          columns={columns}
          data={mappedRolesData}
          isLoading={isLoading || isRefreshing}
          pagination={{
            setLength,
            length,
            total: totalRecords,
            page,
            setPage,
          }}
        />
      </div>
    </>
  );
};

export default RolesList;
