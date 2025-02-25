import { Modal, Table } from "antd";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import { useNotification } from "src/components/contexts/NotificationContext";
import useDebounce from "src/hooks/useDebounce";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import {
  useDeleteUniversity,
  useGetUniversities,
  useUpdateUniversityStatus,
} from "../api-client";
import SubjectFilterOverlay from "./SubjectFilterOverlay";
import TableHeader from "./TableHeader";
import useUniversityTableColumns from "./useUniversityTableColumns";

const UniversitiesList = () => {
  useSetActiveTab(TAB_NAMES.UNIVERSITY);
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
    mutate: mutateUniversityList,
    isValidating,
  } = useGetUniversities({ length, page, search: debouncedSearch });

  const {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSucceed,
    error: deleteErr,
    execute: deleteUniversity,
  } = useDeleteUniversity();

  const {
    execute: handleUniStatusChange,
    isSuccess: isStatusChangeSuccess,
    error: statusChangeError,
  } = useUpdateUniversityStatus();

  const universitiesData = useMemo(() => data?.data?.rows ?? [], [data?.data]);

  const totalRecords = useMemo(
    () => data?.data?.count ?? 0,
    [data?.data?.count]
  );

  const closeDeleteModal = useCallback(() => setIsDeleteModalOpen(false), []);

  const { columns } = useUniversityTableColumns({
    onStatusChange: (id: number, status: boolean) => {
      handleUniStatusChange({ uniId: id, data: { status } });
    },
    onDelete: (id: number) => {
      setIdToOperate(id);
      setIsDeleteModalOpen(true);
    },
  });

  useEffect(() => {
    if (isDeleteSucceed) {
      mutateUniversityList();
      successNotification("University Deleted.");
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
    mutateUniversityList,
    closeDeleteModal,
  ]);

  useEffect(() => {
    if (isStatusChangeSuccess) {
      mutateUniversityList();
      successNotification("University Status Updated.");
    }
    if (statusChangeError) {
      errorNotification();
    }
  }, [
    errorNotification,
    isStatusChangeSuccess,
    mutateUniversityList,
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
        onOk={() => deleteUniversity(idToOperate)}
        onCancel={closeDeleteModal}
        okText={isDeleteLoading ? "Loading..." : "Delete"}
      ></Modal>
      <div className="flex flex-col gap-6">
        <TabHeader label="Universities" />
        <div className="bg-white rounded-lg px-6 py-9 flex flex-col gap-5">
          <TableHeader handleFilterClick={() => setIsFilterOverlayOpen(true)} />
          <Table
            className={classNames({
              "overflow-hidden": universitiesData.length < 1,
            })}
            dataSource={universitiesData}
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

export default UniversitiesList;
