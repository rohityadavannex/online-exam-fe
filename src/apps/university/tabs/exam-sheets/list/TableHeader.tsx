import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddButton from "src/components/buttons/AddButton";
import FilterButton from "src/components/buttons/FilterButton";
import SearchBox from "src/components/inputs/search-box/SearchBox";
import RecordsLength from "src/components/select/records-length/RecordsLength";
import useNotification from "src/hooks/useNotification";
import { useStartExamSheetAllotment } from "../api-client";

const TableHeader = ({
  handleFilterClick,
}: {
  handleFilterClick: () => void;
}) => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { successNotification, errorNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isLoading,
    execute: startAllotment,
    isSuccess,
    error,
  } = useStartExamSheetAllotment({ examId: Number(examId) });

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      successNotification("Successfully alloted exam sheets");
    }

    if (error) {
      if (error?.cause?.status === 400) {
        errorNotification("Allotment happend already.");
      } else {
        errorNotification();
      }
    }
  }, [error, errorNotification, isSuccess, successNotification]);

  return (
    <>
      <Modal
        title="Are You sure you want to start allotment, Once started you will not be able to undo this action ?"
        open={isModalOpen}
        onOk={() => startAllotment()}
        onCancel={() => setIsModalOpen(false)}
        okText={isLoading ? "Loading..." : "Start"}
        cancelButtonProps={{ disabled: isLoading }}
      />
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex items-center gap-5">
          <RecordsLength name={"recordsPerPage"} />
          <SearchBox />
        </div>
        <div className="flex items-start gap-4 flex-wrap">
          <AddButton
            onClick={() => setIsModalOpen(true)}
            label="Allot Exam Sheets"
          />
          <FilterButton onClick={handleFilterClick} />
          <AddButton onClick={() => navigate("create")} label="Add Sheets" />
        </div>
      </div>
    </>
  );
};

export default TableHeader;
