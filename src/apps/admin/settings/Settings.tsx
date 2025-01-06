import { Button } from "antd";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import Profile from "./Profile";
import UpdatePassword from "./UpdatePassword";

const Settings = () => {
  useSetActiveTab(TAB_NAMES.SETTINGS);
  return (
    <div className="divide-y bg-white rounded-xl">
      <Profile />

      <UpdatePassword />

      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 ">Delete account</h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this
            account will be deleted permanently.
          </p>
        </div>

        <form className="flex items-start md:col-span-2">
          <Button type="primary" danger>
            Delete My Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
