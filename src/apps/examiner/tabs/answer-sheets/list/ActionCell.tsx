import { ViewIcon } from "src/icons";

const ActionCell = ({ onView }: { onView: () => void }) => {
  return (
    <div className="w-fit flex px-4 py-3 rounded-lg items-center gap-3 bg-[#FAFBFD] border border-[#EBECEF]">
      <span className="cursor-pointer" onClick={onView}>
        <ViewIcon />
      </span>
    </div>
  );
};

export default ActionCell;
