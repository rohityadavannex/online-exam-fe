import { Table } from "antd";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import { useNotification } from "src/components/contexts/NotificationContext";
import useDebounce from "src/hooks/useDebounce";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { useDeleteSubject, useGetSubjects } from "../api-subject";
import { dummyData } from "../dummyData";
import SubjectFilterOverlay from "./SubjectFilterOverlay";
import TableHeader from "./TableHeader";
import useUniversityTableColumns from "./useUniversityTableColumns";

const UniversitiesList = () => {
  useSetActiveTab(TAB_NAMES.INSTITUTE);
  const [length, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);
  const [isFilterOverlayOpen, setIsFilterOverlayOpen] = useState(false);
  const { successNotification, errorNotification } = useNotification();

  const {
    isLoading,
    error,
    data,
    mutate: updateSectionData,
    isValidating,
  } = useGetSubjects({ length, page, search: debouncedSearch });

  const {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSucceed,
    error: deleteErr,
    execute: deleteSubject,
  } = useDeleteSubject();

  const subjectsData = useMemo(() => data?.data?.rows ?? [], [data?.data]);

  const totalRecords = useMemo(
    () => data?.data?.count ?? 0,
    [data?.data?.count]
  );

  const { columns } = useUniversityTableColumns({
    onDelete: (id: number) => {
      deleteSubject(id);
    },
  });

  useEffect(() => {
    if (isDeleteSucceed) {
      updateSectionData();
      successNotification("Subject Deleted.");
    }
    if (deleteErr) {
      errorNotification();
    }
  }, [
    deleteErr,
    errorNotification,
    isDeleteSucceed,
    successNotification,
    updateSectionData,
  ]);

  return (
    <>
      <SubjectFilterOverlay
        open={isFilterOverlayOpen}
        onClose={() => setIsFilterOverlayOpen(false)}
        handleFilter={(filter) => {}}
      />
      <div className="flex flex-col gap-6">
        <TabHeader label="Universities" />
        <div className="bg-white rounded-lg px-6 py-9 flex flex-col gap-5">
          <TableHeader handleFilterClick={() => setIsFilterOverlayOpen(true)} />
          <Table
            className={classNames({
              "overflow-hidden": subjectsData.length < 1,
            })}
            // dataSource={subjectsData}
            dataSource={dummyData}
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
