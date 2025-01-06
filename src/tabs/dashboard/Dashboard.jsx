import TabHeader from "src/apps/common/tab-header/TabHeader";
import BarChart from "src/components/charts/BarChart";
import LineChart from "src/components/charts/LineChart";
import { TAB_NAMES } from "../../apps/common/menu-navigation/menuNavigation";
import useSetActiveTab from "../../hooks/useSetActiveTab";
import Card from "./common/Card";
import Kpis from "./kpis/Kpis";
import RecentActivity from "./recent-activity/RecentActivity";

const Dashboard = () => {
  useSetActiveTab(TAB_NAMES.DASHBOARD);
  return (
    <div className="flex flex-col gap-[20px]">
      <TabHeader label="Dashboard" onRefresh={() => {}} />
      <Kpis />
      <div className="grid grid-cols-2 gap-[40px]">
        <div className="flex flex-col gap-5">
          <UsersChart />
          <InvoicesChart />
        </div>

        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;

const UsersChart = () => {
  return (
    <Card title="Total Users" subTitle="Total Users: 1200">
      <div className="px-4">
        <LineChart />
      </div>
    </Card>
  );
};

const InvoicesChart = () => {
  return (
    <Card title="Total Invoices" subTitle="Total Invoices: 1200">
      <div className="px-4">
        <BarChart />
      </div>
    </Card>
  );
};
