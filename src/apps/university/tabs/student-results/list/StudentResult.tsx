import { Table } from "antd";
import classNames from "classnames";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { useGetStudentExamResult } from "../api-client";
import useTableColumns from "./useTableColumns";

const StudentResult = () => {
  useSetActiveTab(TAB_NAMES.EXAM);
  const { examId, studentId } = useParams();

  const {
    isLoading,
    error,
    data,
    mutate: mutateList,
    isValidating,
  } = useGetStudentExamResult({ examId, studentId });

  const tableData = useMemo(() => data?.data ?? [], [data?.data]);

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
          pagination={false}
        />
      </div>
    </div>
  );
};

export default StudentResult;
