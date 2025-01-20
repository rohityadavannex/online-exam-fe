import { Outlet } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import NestedNavigation from "src/components/nested-navigation/NestedNavigation";
import useSetActiveTab from "src/hooks/useSetActiveTab";

const tabs = [
  {
    label: "Enrolled Students",
    href: "enrolled",
  },
  {
    label: "Course Students",
    href: "all",
  },
];

const EnrollStudentsList = () => {
  useSetActiveTab(TAB_NAMES.EXAM);

  return (
    <div className="flex flex-col gap-6">
      <TabHeader label="Enroll Students List" />
      <NestedNavigation tabs={tabs} />
      <Outlet />
    </div>
  );
};

export default EnrollStudentsList;
