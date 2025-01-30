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

  const resData = useMemo(() => data?.data ?? {}, [data?.data]);
  const tableData = useMemo(() => resData?.data ?? [], [resData?.data]);

  const totalMarks = useMemo(
    () =>
      tableData.reduce((acc, item) => {
        return acc + item.totalMarks;
      }, 0),
    [tableData]
  );

  const totalObtainedMarks = useMemo(
    () =>
      tableData.reduce((acc, item) => {
        return acc + item.obtainedMarks;
      }, 0),
    [tableData]
  );

  const minimumPassingPercentage = resData?.minimumPassingPercentage ?? 0;

  const percentage = useMemo(
    () => ((totalObtainedMarks / totalMarks) * 100).toFixed(2),
    [totalMarks, totalObtainedMarks]
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
          footer={() => (
            <div className="grid grid-cols-2">
              <div>
                <span className="font-semibold">Percentage:</span>{" "}
                <span>{`${percentage} %`}</span>{" "}
              </div>
              <div>
                <span className="font-semibold">Result:</span>{" "}
                <span>
                  {percentage >= minimumPassingPercentage ? "Pass" : "Failed"}
                </span>{" "}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default StudentResult;
