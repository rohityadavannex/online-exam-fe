import { Table } from "antd";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import { useGetUniversitySubjects } from "src/apps/university/tabs/subjects/api-client";
import useDebounce from "src/hooks/useDebounce";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { getCurrentUserInfo } from "src/redux/selectors/app";
import { useGetAnswerSheets } from "../api-client";
import SubjectFilterOverlay from "./SubjectFilterOverlay";
import TableHeader from "./TableHeader";
import useTableColumns from "./useTableColumns";

const AnswerSheets = () => {
  useSetActiveTab(TAB_NAMES.ANSWER_SHEETS);
  const [length, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);
  const [isFilterOverlayOpen, setIsFilterOverlayOpen] = useState(false);

  const currentUser = useSelector(getCurrentUserInfo);

  const { getSubjectLabel } = useGetUniversitySubjects(currentUser?.uniId);

  const {
    isLoading,
    error,
    data,
    mutate: mutateList,
    isValidating,
  } = useGetAnswerSheets({ length, page, search: debouncedSearch });

  const tableData = useMemo(() => data?.data?.rows ?? [], [data?.data]);

  const totalRecords = useMemo(
    () => data?.data?.count ?? 0,
    [data?.data?.count]
  );

  const { columns } = useTableColumns({ getSubjectLabel });

  return (
    <>
      <SubjectFilterOverlay
        open={isFilterOverlayOpen}
        onClose={() => setIsFilterOverlayOpen(false)}
        handleFilter={(filter) => {}}
      />
      <div className="flex flex-col gap-6">
        <TabHeader label="Answer Sheets" />
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

export default AnswerSheets;
