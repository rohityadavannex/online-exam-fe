import { Modal, Table } from "antd";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import { useNotification } from "src/components/contexts/NotificationContext";
import useDebounce from "src/hooks/useDebounce";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import {
  useDeleteAssignedSubject,
  useGetAssignedSubjects,
} from "../api-client";
import AssignSubjects from "../AssignSubjects";
import SubjectFilterOverlay from "./SubjectFilterOverlay";
import TableHeader from "./TableHeader";
import useTableColumns from "./useTableColumns";

const AssignedSubjectsList = () => {
  useSetActiveTab(TAB_NAMES.EXAM);
  const { examId } = useParams();
  const [length, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);
  const [isFilterOverlayOpen, setIsFilterOverlayOpen] = useState(false);
  const { successNotification, errorNotification } = useNotification();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignSubjectModalOpen, setIsAssignSubjectModalOpen] =
    useState(false);
  const [idToOperate, setIdToOperate] = useState<Number | undefined>(undefined);

  const {
    isLoading,
    error,
    data,
    mutate: mutateList,
    isValidating,
  } = useGetAssignedSubjects({
    length,
    page,
    search: debouncedSearch,
    examId: Number(examId),
  });

  const {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSucceed,
    error: deleteErr,
    execute: executeDelete,
  } = useDeleteAssignedSubject({ examId: Number(examId) });

  const tableData = useMemo(() => data?.data?.rows ?? [], [data?.data]);

  const totalRecords = useMemo(
    () => data?.data?.count ?? 0,
    [data?.data?.count]
  );

  const closeDeleteModal = useCallback(() => setIsDeleteModalOpen(false), []);
  const closeAssignSubjectModal = useCallback(
    () => setIsAssignSubjectModalOpen(false),
    []
  );

  const { columns } = useTableColumns({
    onEdit: (id: number) => {
      setIdToOperate(id);
      setIsAssignSubjectModalOpen(true);
    },
    onDelete: (id: number) => {
      setIdToOperate(id);
      setIsDeleteModalOpen(true);
    },
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
      <AssignSubjects
        isModalOpen={isAssignSubjectModalOpen}
        onClose={closeAssignSubjectModal}
        subjectId={idToOperate}
      />
      <div className="flex flex-col gap-6">
        {/* <TabHeader label="Assign Subject" /> */}
        <div className="bg-white rounded-lg px-6 py-9 flex flex-col gap-5">
          <TableHeader
            onAddClick={() => setIsAssignSubjectModalOpen(true)}
            handleFilterClick={() => setIsFilterOverlayOpen(true)}
          />
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

export default AssignedSubjectsList;
