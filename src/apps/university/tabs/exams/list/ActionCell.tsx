import { DeleteIcon, ViewIcon } from "src/icons";

const ActionCell = ({
  onView,
  handleCenter,
  onAdd,
  onDelete,
  onEnrollBtnClick,
}: {
  onAdd: () => void;
  handleCenter: () => void;
  onView: () => void;
  onDelete: () => void;
  onEnrollBtnClick: () => void;
}) => {
  return (
    <div className="w-fit flex px-4 py-3 rounded-lg items-center gap-3 bg-[#FAFBFD] border border-[#EBECEF]">
      {/* <span className="cursor-pointer" onClick={onAdd}>
        <AddIcon className="size-5" color="gray" />
      </span>
      <span className="cursor-pointer" onClick={handleCenter}>
        <BuildingLibraryIcon className="size-5" color="gray" />
      </span>
      <span className="cursor-pointer" onClick={onEnrollBtnClick}>
        <UsersIcon className="size-5" color="gray" />
      </span> */}
      <span className="cursor-pointer" onClick={onView}>
        <ViewIcon className="size-5" />
      </span>
      <span className="cursor-pointer" onClick={onDelete}>
        <DeleteIcon className="size-5" />
      </span>
    </div>
  );
};

export default ActionCell;
