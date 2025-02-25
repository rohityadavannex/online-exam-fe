import { AddIcon, DeleteIcon, EditIcon } from "src/icons";

const ActionCell = ({
  onEdit,
  onAdd,
  onDelete,
}: {
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="w-fit flex px-4 py-3 rounded-lg items-center gap-3 bg-[#FAFBFD] border border-[#EBECEF]">
      <span className="cursor-pointer" onClick={onAdd}>
        <AddIcon color="gray" className="size-5" />
      </span>
      <span className="cursor-pointer" onClick={onEdit}>
        <EditIcon color="gray" />
      </span>
      <span className="cursor-pointer" onClick={onDelete}>
        <DeleteIcon />
      </span>
    </div>
  );
};

export default ActionCell;
