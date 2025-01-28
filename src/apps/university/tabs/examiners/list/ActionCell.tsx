import { LockClosedIcon } from "@heroicons/react/24/outline";
import { DeleteIcon, ViewIcon } from "src/icons";

const ActionCell = ({
  onView,
  onDelete,
}: {
  onView: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="w-fit flex px-4 py-3 rounded-lg items-center gap-3 bg-[#FAFBFD] border border-[#EBECEF]">
      <span className="cursor-pointer" onClick={onView}>
        <LockClosedIcon className="size-4" />
      </span>
      <span className="cursor-pointer" onClick={onView}>
        <ViewIcon />
      </span>
      <span className="cursor-pointer" onClick={onDelete}>
        <DeleteIcon />
      </span>
    </div>
  );
};

export default ActionCell;
