import FilterButton from "src/components/buttons/FilterButton";
import SearchBox from "src/components/inputs/search-box/SearchBox";
import RecordsLength from "src/components/select/records-length/RecordsLength";

const TableHeader = ({
  handleFilterClick,
}: {
  handleFilterClick: () => void;
}) => {
  return (
    <div className="flex justify-between flex-wrap gap-4">
      <div className="flex items-center gap-5">
        <RecordsLength name={"recordsPerPage"} />
        <SearchBox />
      </div>
      <div className="flex items-start gap-4 flex-wrap">
        <FilterButton onClick={handleFilterClick} />
      </div>
    </div>
  );
};

export default TableHeader;
