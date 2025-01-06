import { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import Button from "src/components/buttons/Button";
import TextCell from "src/components/tables/cells/TextCell";
import ActionCell from "./ActionCell";
import AcademicYearType from "./academic-year-types";

const useAcademicYearTableColumns = ({
  onDelete,
}: {
  onDelete: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const columns: TableProps<AcademicYearType>["columns"] = [
    {
      title: "Academic Year",
      dataIndex: "academicYear",
      render: (text: string) => text,
    },
    {
      title: "Status",
      dataIndex: "isRunning",
      render: (text) => (
        <Button type="primary" disabled={text}>
          {text ? "Active" : "Activate"}
        </Button>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      render: (text: string) => <TextCell value={text} />,
    },
    {
      title: "Action",
      dataIndex: "id",
      className: "!text-end",
      render: (text: number) => {
        return (
          <ActionCell
            onView={() => navigate(`create/${text}`)}
            onDelete={() => onDelete(text)}
          />
        );
      },
    },
  ];

  return {
    columns,
  };
};

export default useAcademicYearTableColumns;
