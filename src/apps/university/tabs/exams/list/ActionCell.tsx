import { AddIcon, DeleteIcon, ViewIcon } from "src/icons";
import { UsersIcon } from "src/icons/UsersIcon";

const ActionCell = ({
  onView,
  onAdd,
  onDelete,
  onEnrollBtnClick,
}: {
  onAdd: () => void;
  onView: () => void;
  onDelete: () => void;
  onEnrollBtnClick: () => void;
}) => {
  return (
    <div className="w-fit flex px-4 py-3 rounded-lg items-center gap-3 bg-[#FAFBFD] border border-[#EBECEF]">
      <span className="cursor-pointer" onClick={onAdd}>
        <AddIcon color="gray" />
      </span>
      <span className="cursor-pointer" onClick={onEnrollBtnClick}>
        <UsersIcon className="w-6" />
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
