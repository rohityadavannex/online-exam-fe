import { Popconfirm } from "antd";
import { DeleteIcon } from "src/icons/DeleteIcon";

const DeleteButton = ({
  onDelete,
  isDeleteLoading,
}: {
  onDelete: () => void;
  isDeleteLoading: boolean;
}) => {
  return (
    <Popconfirm
      title="Delete the section"
      description="Are you sure to delete this section?"
      onConfirm={onDelete}
      okText={isDeleteLoading ? "Loading..." : "Yes"}
      cancelText="No"
    >
      <span className="cursor-pointer">
        <DeleteIcon />
      </span>
    </Popconfirm>
  );
};

export default DeleteButton;
