import { TableProps, Tag } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getGenderLabel } from "src/helpers/helpers";
import { GENDER_ENUM } from "src/utils/constants";
import ActionCell from "./ActionCell";
import SubjectType from "./types";

const useTableColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const columns: TableProps<SubjectType>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      render: (text: string, record: SubjectType, index: number) => index + 1,
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: "Subject Name",
      dataIndex: "name",
      render: (text: string) => text,
    },

    {
      title: "Exam Date",
      dataIndex: "examDate",
      render: (text: string) =>
        text ? dayjs(text).format("DD MMMM YYYY") : "-",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (text: number, record: SubjectType) => {
        return (
          <ActionCell
            onAdd={() => navigate(`${record.subjectId}/questions`)}
            onEdit={() => onEdit(record.id)}
            onDelete={() => onDelete(record.id)}
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
