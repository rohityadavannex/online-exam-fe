import { AddWithoutCircleIcon } from "src/icons";
import Button from "./Button";

const AddButton = ({
  label = "Add",
  onClick,
}: {
  label?: string;
  onClick: () => void;
}) => {
  return (
    <Button
      icon={<AddWithoutCircleIcon />}
      type="primary"
      onClick={onClick}
      className="px-5 py-2 rounded-[10px]"
    >
      <span className="text-base font-normal">{label}</span>
    </Button>
  );
};

export default AddButton;
