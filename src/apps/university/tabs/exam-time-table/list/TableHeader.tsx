import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddButton from "src/components/buttons/AddButton";
import FilterButton from "src/components/buttons/FilterButton";
import SearchBox from "src/components/inputs/search-box/SearchBox";
import RecordsLength from "src/components/select/records-length/RecordsLength";
import useNotification from "src/hooks/useNotification";
import { useStartExamCenterAllotment } from "../api-client";

const TableHeader = ({
  handleFilterClick,
  onAddClick,
}: {
  handleFilterClick: () => void;
  onAddClick: () => void;
}) => {
  const { examId } = useParams();
  const { successNotification, errorNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isLoading,
    execute: startAllotment,
    isSuccess,
    error,
  } = useStartExamCenterAllotment({ examId: Number(examId) });

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      successNotification("Successfully alloted exam centers");
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
    <div className="flex justify-between flex-wrap gap-4">
      <div className="flex items-center gap-5">
        <RecordsLength name={"recordsPerPage"} />
        <SearchBox />
      </div>
      <div className="flex items-start gap-4 flex-wrap">
        <FilterButton onClick={handleFilterClick} />

        <AddButton onClick={() => onAddClick()} label="Add Subject" />
      </div>
    </div>
  );
};

export default TableHeader;
