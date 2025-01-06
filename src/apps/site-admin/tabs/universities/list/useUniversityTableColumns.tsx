import { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import ListTextCell from "src/apps/super-admin/tabs/roles/list/ListTextCell";
import ActionCell from "./ActionCell";
import UniversityType from "./university-types";

const useUniversityTableColumns = ({
  onDelete,
}: {
  onDelete: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const columns: TableProps<UniversityType>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      render: (text: string, record: UniversityType, index: number) =>
        index + 1,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => text,
    },
    {
      title: "Teacher Name",
      dataIndex: "teacher",
      render: (text) => (
        <ListTextCell value={text} className="!justify-start" />
      ),
    },
    {
      title: "Class",
      dataIndex: "class",
      render: (text: string) => text,
    },
    {
      title: "Action",
      dataIndex: "id",
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

export default useUniversityTableColumns;
