import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import ConfirmationModal from "src/components/modals/ConfirmationModal";
import ReactTable from "src/components/tables/react-table/ReactTable";
import {
  getCityLabel,
  getCountryLabel,
  getFormattedDate,
  getStateLabel,
  handleCsvExport,
} from "src/helpers/helpers";
import useDebounce from "src/hooks/useDebounce";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import {
  useDeleteUser,
  useGetUsers,
  useUpdateUserStatus,
} from "../api-clients";
import useUserTableColumns from "./useUserTableColumns";
import { UserType } from "./user-types";

const UsersList = () => {
  useSetActiveTab(TAB_NAMES.USERS);
  const navigate = useNavigate();
  const [length, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);
  const { successNotification, errorNotification } = useNotification();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToOperate, setIdToOperate] = useState<number | undefined>(undefined);
  const { execute: handleUserStatusChange, isSuccess: isStatusUpdateSuccess } =
    useUpdateUserStatus();
  const {
    isLoading,
    error,
    data,
    mutate: updateUserData,
    isValidating,
  } = useGetUsers({ length, page, search: debouncedSearch });

  const {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSucceed,
    error: deleteErr,
    execute: deleteUser,
  } = useDeleteUser();

  const usersData = useMemo(() => data?.data?.rows ?? [], [data?.data]);

  const mappedUsersData = useMemo(() => {
    return usersData.map((user: UserType) => {
      return {
        ...user,
        country: getCountryLabel(user.country),
        state: getStateLabel(user.state),
        city: getCityLabel(user.city),
        createdAt: getFormattedDate(user.createdAt),
        updatedAt: getFormattedDate(user.updatedAt),
      };
    });
  }, [usersData]);

  const totalRecords = useMemo(() => data?.data?.count, [data?.data?.count]);

  const columns = useUserTableColumns({
    onDelete: (id: number) => {
      setIdToOperate(id);
      setIsDeleteModalOpen(true);
    },
    handleUserStatusChange,
  });

  useEffect(() => {
    if (isDeleteSucceed) {
      updateUserData();
      setIsDeleteModalOpen(false);
      successNotification("User Deleted.");
    }
  }, [isDeleteSucceed, successNotification, updateUserData]);

  useEffect(() => {
    if (deleteErr) {
      errorNotification();
    }
  }, [deleteErr, errorNotification]);

  useEffect(() => {
    if (isStatusUpdateSuccess) {
      updateUserData();
    }
  }, [isStatusUpdateSuccess, updateUserData]);

  return (
    <>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        isLoading={isDeleteLoading}
        onSubmit={() => deleteUser(idToOperate)}
      />
      <div className="flex flex-col gap-[20px]">
        <TabHeader
          label="User Management"
          onRefresh={() => updateUserData()}
          exportButton={{
            label: "Export",
            onClick: () => handleCsvExport(mappedUsersData),
          }}
          printButton={{
            label: "Print",
            onClick: () => window.print(),
          }}
          createButton={{
            label: "Create User",
            onClick: () => navigate("/users/create"),
          }}
          search={{
            onChange: (val) => setSearchText(val),
            value: searchText,
          }}
        />
        <ReactTable
          columns={columns}
          data={mappedUsersData}
          isLoading={isLoading}
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

export default UsersList;
