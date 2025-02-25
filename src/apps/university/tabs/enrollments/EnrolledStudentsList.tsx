import { Table } from "antd";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import useDebounce from "src/hooks/useDebounce";
import useSetActiveTab from "src/hooks/useSetActiveTab";

import useNotification from "src/hooks/useNotification";
import { useGetUniversityCourses } from "../courses/api-client";
import {
  useGetExamEnrolledStudent,
  useUpdateExamEnrolledStatus,
} from "./api-client";
import SubjectFilterOverlay from "./SubjectFilterOverlay";
import TableHeader from "./TableHeader";
import useTableColumns from "./useTableColumns";

const tabs = [
  {
    label: "Enrolled Students",
    href: "enrolled",
  },
  {
    label: "Students",
    href: "all",
  },
];

const EnrolledStudentsList = () => {
  useSetActiveTab(TAB_NAMES.EXAM);
  const { successNotification, errorNotification } = useNotification();
  const { examId } = useParams();
  const [length, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);
  const [isFilterOverlayOpen, setIsFilterOverlayOpen] = useState(false);

  const { getCourseLabel } = useGetUniversityCourses();

  const {
    isLoading: isUpdateStatusLoading,
    execute: updateStatus,
    isSuccess: updateSuccess,
    error: updateError,
  } = useUpdateExamEnrolledStatus({
    examId: Number(examId),
    length,
    page,
    search: debouncedSearch,
  });

  const {
    isLoading,
    error,
    data,
    mutate: mutateList,
    isValidating,
  } = useGetExamEnrolledStudent({
    examId: Number(examId),
    length,
    page,
    search: debouncedSearch,
  });

  const tableData = useMemo(() => data?.data?.rows ?? [], [data?.data]);

  const totalRecords = useMemo(
    () => data?.data?.count ?? 0,
    [data?.data?.count]
  );

  const { columns } = useTableColumns({ getCourseLabel, updateStatus });

  useEffect(() => {
    if (updateSuccess) {
      successNotification();
      mutateList();
    }
    if (updateError) {
      errorNotification();
    }
  }, [
    errorNotification,
    mutateList,
    successNotification,
    updateError,
    updateSuccess,
  ]);

  return (
    <>
      <SubjectFilterOverlay
        open={isFilterOverlayOpen}
        onClose={() => setIsFilterOverlayOpen(false)}
        handleFilter={(filter) => {}}
      />

      <div className="flex flex-col gap-6">
        {/* <TabHeader label="Enrollment Requests" /> */}
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

export default EnrolledStudentsList;
