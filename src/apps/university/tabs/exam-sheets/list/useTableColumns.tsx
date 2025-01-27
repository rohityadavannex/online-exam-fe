import { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { PdfIcon } from "src/icons";
import ActionCell from "./ActionCell";
import ExamSheetTypes from "./types";

const useTableColumns = ({
  getSubjectLabel,
  onDelete,
}: {
  getSubjectLabel: (id: number) => string;
  onDelete: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const columns: TableProps<ExamSheetTypes>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      render: (text: string, record: ExamSheetTypes, index: number) =>
        index + 1,
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: "Roll No.",
      dataIndex: "rollNo",
      render: (text: string) => text,
    },
    {
      title: "Serial No.",
      dataIndex: "serialNo",
      render: (text: string) => text,
    },
    {
      title: "Subject",
      dataIndex: "subjectId",
      render: (text: number) => getSubjectLabel(text),
    },
    {
      title: "Answer Sheet",
      dataIndex: "answerSheet",
      render: (text: number) => (
        <a
          target="_blank"
          rel="noreferrer"
          href={`${process.env.REACT_APP_API_URL}/uploads/${text}`}
        >
          <PdfIcon />
        </a>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (text: number, record: ExamSheetTypes) => {
        return (
          <ActionCell
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
