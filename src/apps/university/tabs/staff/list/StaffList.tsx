import { Modal, Table } from "antd";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import { RoleType } from "src/apps/super-admin/tabs/roles/list/role-types";
import { useNotification } from "src/components/contexts/NotificationContext";
import useDebounce from "src/hooks/useDebounce";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { useGetRoles } from "../../roles/api-client";
import {
  useDeleteStaff,
  useGetExaminers,
  useUpdateStaffStatus,
} from "../api-client";
import SubjectFilterOverlay from "./SubjectFilterOverlay";
import TableHeader from "./TableHeader";
import useTableColumns from "./useTableColumns";

const StaffList = () => {
  useSetActiveTab(TAB_NAMES.STAFF);
  const [length, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);
  const [isFilterOverlayOpen, setIsFilterOverlayOpen] = useState(false);
  const { successNotification, errorNotification } = useNotification();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToOperate, setIdToOperate] = useState<Number | undefined>(undefined);

  const {
    isLoading,
    error,
    data,
    mutate: mutateList,
    isValidating,
  } = useGetExaminers({ length, page, search: debouncedSearch });

  const {
    isLoading: isRolesLoading,
    error: rolesError,
    data: rolesData,
    mutate: updateRoleData,
  } = useGetRoles({});

  const roles = useMemo(
    () =>
      (rolesData?.data?.rows ?? []).map((role: RoleType) => ({
        label: role.name,
        value: role.id,
      })),
    [rolesData?.data?.rows]
  );

  const getRoleLabel = useCallback(
    (id: number) => {
      return (
        roles.find(
          (role: { label: string; value: number }) => role.value === id
        )?.label ?? "-"
      );
    },
    [roles]
  );

  const {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSucceed,
    error: deleteErr,
    execute: executeDelete,
  } = useDeleteStaff();

  const {
    execute: handleUniStatusChange,
    isSuccess: isStatusChangeSuccess,
    error: statusChangeError,
  } = useUpdateStaffStatus();

  const tableData = useMemo(() => data?.data?.rows ?? [], [data?.data]);

  const totalRecords = useMemo(
    () => data?.data?.count ?? 0,
    [data?.data?.count]
  );

  const closeDeleteModal = useCallback(() => setIsDeleteModalOpen(false), []);

  const { columns } = useTableColumns({
    onStatusChange: (id: number, status: boolean) => {
      handleUniStatusChange({ staffId: id, data: { status } });
    },
    onDelete: (id: number) => {
      setIdToOperate(id);
      setIsDeleteModalOpen(true);
    },
    getRoleLabel,
  });

  useEffect(() => {
    if (isDeleteSucceed) {
      mutateList();
      successNotification("Delete successfully");
      closeDeleteModal();
    }
    if (deleteErr) {
      errorNotification();
    }
  }, [
    deleteErr,
    errorNotification,
    isDeleteSucceed,
    successNotification,
    mutateList,
    closeDeleteModal,
  ]);

  useEffect(() => {
    if (isStatusChangeSuccess) {
      mutateList();
      successNotification("Updated successfully");
    }
    if (statusChangeError) {
      errorNotification();
    }
  }, [
    errorNotification,
    isStatusChangeSuccess,
    mutateList,
    statusChangeError,
    successNotification,
  ]);

  return (
    <>
      <SubjectFilterOverlay
        open={isFilterOverlayOpen}
        onClose={() => setIsFilterOverlayOpen(false)}
        handleFilter={(filter) => {}}
      />
      <Modal
        title="Are You sure you want to delete this ?"
        open={isDeleteModalOpen}
        onOk={() => executeDelete(idToOperate)}
        onCancel={closeDeleteModal}
        okText={isDeleteLoading ? "Loading..." : "Delete"}
      ></Modal>
      <div className="flex flex-col gap-6">
        <TabHeader label="Staff" />
        <div className="bg-white rounded-lg px-6 py-9 flex flex-col gap-5">
          <TableHeader handleFilterClick={() => setIsFilterOverlayOpen(true)} />
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

export default StaffList;
