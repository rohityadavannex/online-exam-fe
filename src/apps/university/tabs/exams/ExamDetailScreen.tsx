import { Outlet } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import NestedNavigation from "src/components/nested-navigation/NestedNavigation";
import useSetActiveTab from "src/hooks/useSetActiveTab";

const tabs = [
  {
    label: "Exam Subjects",
    href: "subjects",
  },
  {
    label: "Exam Centers",
    href: "centers",
  },
  {
    label: "Enrolled Students",
    href: "enrollments",
  },
];

const ExamDetailScreen = () => {
  useSetActiveTab(TAB_NAMES.EXAM);

  return (
    <div className="flex flex-col gap-6">
      <TabHeader label="Exam Info" />
      <NestedNavigation tabs={tabs} />
      <Outlet />
    </div>
  );
};

export default ExamDetailScreen;
