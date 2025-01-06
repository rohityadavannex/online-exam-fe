import { useNavigate } from "react-router-dom";
import GroupedButton from "src/components/buttons/grouped-button/GroupedButton";
import { DeleteIcon } from "src/icons/DeleteIcon";
import { EditIcon } from "src/icons/EditIcon";
import { ViewIcon } from "src/icons/ViewIcon";

const ActionsCell = ({
  value,
  onDelete,
}: {
  value: number;
  onDelete: () => void;
}) => {
  const navigate = useNavigate();
  const isAdminRole = value === 2;

  const options = [
    {
      icon: EditIcon,
      tooltip: "Edit",
      onClick: () => navigate(`create/${value}`),
    },
    {
      icon: ViewIcon,
      tooltip: "View",
      onClick: () => navigate(`view/${value}`),
    },
    {
      icon: DeleteIcon,
      tooltip: isAdminRole ? "You can not delete admin role." : "Delete",
      onClick: onDelete,
      disabled: isAdminRole,
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <GroupedButton options={options} />
    </div>
  );
};

export default ActionsCell;
