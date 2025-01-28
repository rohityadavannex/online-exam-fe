import { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { PdfIcon } from "src/icons";
import ActionCell from "./ActionCell";
import StudentType from "./types";

const useTableColumns = ({
  getSubjectLabel,
}: {
  getSubjectLabel: (id: number) => string;
}) => {
  const navigate = useNavigate();
  const columns: TableProps<StudentType>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      render: (text: string, record: StudentType, index: number) => index + 1,
      sorter: (a, b) => a.id - b.id,
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
      dataIndex: "sheetId",
      render: (text: number, record: StudentType) => {
        return (
          <ActionCell
            //@ts-ignore
            onView={() => navigate(`check/${record.subjectId}/${text}`)}
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
