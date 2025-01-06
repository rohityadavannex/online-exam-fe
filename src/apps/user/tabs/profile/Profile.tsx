import { Outlet } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import NestedNavigation from "src/components/nested-navigation/NestedNavigation";
import useSetActiveTab from "src/hooks/useSetActiveTab";

const tabs = [
  {
    label: "Profile",
    href: "/profile/edit",
  },
  {
    label: "Security",
    href: "/profile/security",
  },
];

const Profile = () => {
  useSetActiveTab(TAB_NAMES.EDIT_PROFILE_SETTINGS);
  return (
    <div className="flex flex-col gap-[20px] h-full">
      <TabHeader label="Profile" showBreadcrumb />
      <div className="flex flex-col justify-between gap-6 bg-white rounded-md py-[30px] px-[42px] h-fit">
        <NestedNavigation tabs={tabs} />
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
