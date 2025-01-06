import { Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import { useNotification } from "src/components/contexts/NotificationContext";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { hasDeleteAccess, hasViewAccess } from "src/redux/selectors/app";

const PeopleList = () => {
  useSetActiveTab(TAB_NAMES.PEOPLE);
  const isDeleteAllowed = useSelector(hasDeleteAccess);
  const isViewAllowed = useSelector(hasViewAccess);

  const navigate = useNavigate();
  const { successNotification, errorNotification } = useNotification();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">All Users</span>
        <Button onClick={() => navigate("/users/create")} type="primary">
          Add People
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {isViewAllowed && <Button>View</Button>}
        <Button type="primary">Edit</Button>
        <Button
          type="primary"
          danger
          onClick={() => {
            if (isDeleteAllowed) {
              successNotification();
            } else {
              errorNotification();
            }
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PeopleList;
