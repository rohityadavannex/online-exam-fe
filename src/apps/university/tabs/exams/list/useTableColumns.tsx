import { TableProps, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import Toggle from "src/components/toggles/Toggle";
import {
  getExamTypeLabel,
  getGenderLabel,
  getSemesterLabel,
} from "src/helpers/helpers";
import { GENDER_ENUM } from "src/utils/constants";
import ActionCell from "./ActionCell";
import AcademicYearType from "./types";

const useTableColumns = ({
  onStatusChange,
  onDelete,
  getCourseLabel,
  getAcademicYearLabel,
}: {
  onStatusChange: (id: number, status: boolean) => void;
  onDelete: (id: number) => void;
  getCourseLabel: (id: number) => string;
  getAcademicYearLabel: (id: number) => string;
}) => {
  const navigate = useNavigate();
  const columns: TableProps<AcademicYearType>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      render: (text: string, record: AcademicYearType, index: number) =>
        index + 1,
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => text,
    },
    {
      title: "Academic Year",
      dataIndex: "academicYear",
      render: (text: number) => {
        return getAcademicYearLabel(text);
      },
    },
    {
      title: "Course",
      dataIndex: "course",
      render: (text: number) => {
        return getCourseLabel(text);
      },
    },
    {
      title: "Semester",
      dataIndex: "semester",
      render: (text: number) => getSemesterLabel(text),
    },
    {
      title: "Exam Type",
      dataIndex: "examType",
      render: (text: number) => getExamTypeLabel(text),
    },
    {
      title: "Note",
      dataIndex: "note",
      render: (text: string) => text,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: boolean, record: AcademicYearType) => (
        <Toggle
          checked={text}
          onToggle={(value) => onStatusChange(record?.id, value)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (text: number, record: AcademicYearType) => {
        return (
          <ActionCell
            onAdd={() => navigate(`${record.id}/questions`)}
            onView={() => navigate(`create/${record.id}`)}
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
