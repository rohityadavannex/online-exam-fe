import { AddIcon, ViewIcon } from "src/icons";

const ActionCell = ({
  onView,
  onAdd,
  onDelete,
}: {
  onAdd: () => void;
  onView: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="w-fit flex px-4 py-3 rounded-lg items-center gap-3 bg-[#FAFBFD] border border-[#EBECEF]">
      <span className="cursor-pointer" onClick={onAdd}>
        <AddIcon color="gray" />
      </span>
      <span className="cursor-pointer" onClick={onView}>
        <ViewIcon />
      </span>
    </div>
  );
};

export default ActionCell;
