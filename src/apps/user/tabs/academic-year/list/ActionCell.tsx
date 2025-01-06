import DeleteButton from "src/components/buttons/DeleteButton";
import { ViewIcon } from "src/icons";

const ActionCell = ({
  onView,
  onDelete,
}: {
  onView: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="flex items-center gap-4 justify-end">
      <div className="w-fit flex px-4 py-3 rounded-lg items-center gap-3 bg-[#FAFBFD] border border-[#EBECEF]">
        <span className="cursor-pointer" onClick={onView}>
          <ViewIcon />
        </span>
        <DeleteButton onDelete={onDelete} />
      </div>
    </div>
  );
};

export default ActionCell;
