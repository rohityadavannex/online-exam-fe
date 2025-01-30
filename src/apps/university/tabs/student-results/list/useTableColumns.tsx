import { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import StaffType from "./types";

const useTableColumns = () => {
  const navigate = useNavigate();
  const columns: TableProps<StaffType>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      render: (text: string, record: StaffType, index: number) => index + 1,
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: "Subject",
      dataIndex: "subject",
      render: (text: string) => text,
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
      render: (text: string) => text,
    },
    {
      title: "Obtained Marks",
      dataIndex: "obtainedMarks",
      render: (text: string) => text,
    },
    // {
    //   title: "Result",
    //   dataIndex: "phone",
    //   render: (text: string) => text,
    // },
  ];

  return {
    columns,
  };
};

export default useTableColumns;
