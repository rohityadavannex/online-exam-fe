import { FilterIcon } from "src/icons/FilterIcon";
import Button from "./Button";

const FilterButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button icon={<FilterIcon />} onClick={onClick}>
      Filter
    </Button>
  );
};

export default FilterButton;
