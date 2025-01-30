import { TableProps, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import ListTextCell from "src/apps/super-admin/tabs/roles/list/ListTextCell";
import Toggle from "src/components/toggles/Toggle";
import { getGenderLabel } from "src/helpers/helpers";
import { GENDER_ENUM } from "src/utils/constants";
import ActionCell from "./ActionCell";
import StaffType from "./types";

const useTableColumns = ({
  onStatusChange,
  onDelete,
}: {
  onStatusChange: (id: number, status: boolean) => void;
  onDelete: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const columns: TableProps<StaffType>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      render: (text: string, record: StaffType, index: number) => index + 1,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Role Name",
      dataIndex: "name",
      render: (text: string, record: StaffType) => text,
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      render: (text: string[]) => <ListTextCell value={text} />,
    },
    {
      title: "Status",
      dataIndex: "active",
      render: (text: boolean, record: StaffType) => (
        <Toggle
          checked={text}
          onToggle={(value) => onStatusChange(record?.id, value)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (text: number, record: StaffType) => {
        return (
          <ActionCell
            onView={() => navigate(`${text}/create`)}
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

export default useTableColumns;

export const GenderCell = ({ id }: { id: number }) => {
  if (id === GENDER_ENUM.MALE) {
    return <Tag color="blue">{getGenderLabel(id)}</Tag>;
  }
  if (id === GENDER_ENUM.FEMALE) {
    return <Tag color="pink">{getGenderLabel(id)}</Tag>;
  }
  return <Tag>{getGenderLabel(id)}</Tag>;
};
