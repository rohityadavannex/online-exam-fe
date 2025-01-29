import { Table } from "antd";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import useDebounce from "src/hooks/useDebounce";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { useGetExaminers } from "../api-client";
import useTableColumns from "./useTableColumns";

const StudentResult = () => {
  useSetActiveTab(TAB_NAMES.EXAM);
  const [length, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);

  const {
    isLoading,
    error,
    data,
    mutate: mutateList,
    isValidating,
  } = useGetExaminers({ length, page, search: debouncedSearch });

  const tableData = useMemo(() => data?.data?.rows ?? [], [data?.data]);

  const totalRecords = useMemo(
    () => data?.data?.count ?? 0,
    [data?.data?.count]
  );

  const { columns } = useTableColumns();

  return (
    <div className="flex flex-col gap-6">
      <TabHeader label="Student Result" />
      <div className="bg-white rounded-lg px-6 py-9 flex flex-col gap-5">
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
  );
};

export default StudentResult;
