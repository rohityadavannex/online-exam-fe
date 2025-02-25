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
      {label}
    </Button>
  );
};

export default AddButton;
