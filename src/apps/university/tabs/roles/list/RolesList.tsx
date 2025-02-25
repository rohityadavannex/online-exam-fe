import { Modal, Table } from "antd";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import { RoleType } from "src/apps/super-admin/tabs/roles/list/role-types";
import { useNotification } from "src/components/contexts/NotificationContext";
import { getFormattedDate } from "src/helpers/helpers";
import useDebounce from "src/hooks/useDebounce";
import useManualRefresh from "src/hooks/useManualRefresh";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { ROLE_PERMISSION_FEATURES } from "src/utils/constants";
import { useDeleteRole, useGetRoles, useUpdateRoleStatus } from "../api-client";
import TableHeader from "./TableHeader";
import useTableColumns from "./useTableColumns";

const RolesList = () => {
  useSetActiveTab(TAB_NAMES.ROLES);

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

  const tableData = useMemo(() => {
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

  const { columns } = useTableColumns({
    onDelete: (id: number) => {
      setIdToOperate(id);
      setIsDeleteModalOpen(true);
    },
    onStatusChange: handleRoleStatusChange,
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
      <Modal
        title="Are You sure you want to delete this ?"
        open={isDeleteModalOpen}
        onOk={() => deleteRole(idToOperate)}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText={isDeleteLoading ? "Loading..." : "Delete"}
      ></Modal>
      <div className="flex flex-col gap-6">
        <TabHeader label="Roles" />
        <div className="bg-white rounded-lg px-6 py-9 flex flex-col gap-5">
          <TableHeader />
          <Table
            className={classNames({
              "overflow-hidden": tableData.length < 1,
            })}
            dataSource={tableData}
            columns={columns}
            rowHoverable={false}
            scroll={{ x: true }}
            pagination={{
              pageSize: 10,
              position: ["bottomRight"],
              showTotal: (total, [start, end]) =>
                `Showing ${start} to ${end} of ${total} entries`,
              onChange: (page) => console.log("page: ", page),
              total: totalRecords,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default RolesList;
