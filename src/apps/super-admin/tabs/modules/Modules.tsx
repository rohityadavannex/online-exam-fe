import { Button, Switch, Table, TableProps } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { useGetModule } from "./apis";

const Modules = () => {
  useSetActiveTab(TAB_NAMES.MODULES);
  const navigate = useNavigate();

  const { isLoading, data } = useGetModule();
  const modules = useMemo(() => data?.data ?? [], [data?.data]);
  return (
    <div className="flex flex-col gap-5">
      <TabHeader
        label="App Modules"
        buttonLabel="Add module"
        onButtonClick={() => navigate("/modules/create")}
      />
      <Table columns={columns} dataSource={modules} loading={isLoading} />
    </div>
  );
};

export default Modules;

const columns: TableProps<any>["columns"] = [
  {
    title: () => <div className="flex justify-center">Label</div>,
    dataIndex: "label",
    key: "label",
    render: (text) => <div className="flex justify-center">{text}</div>,
  },
  {
    title: () => <div className="flex justify-center">Value</div>,
    dataIndex: "value",
    key: "value",
    render: (text) => <div className="flex justify-center">{text}</div>,
  },
  {
    title: () => <div className="flex justify-center">Active</div>,
    dataIndex: "active",
    key: "active",
    render: (text) => (
      <div className="flex justify-center gap-3">
        <Switch value={text} />
      </div>
    ),
  },
  {
    title: () => <div className="flex justify-center">Actions</div>,
    key: "id",
    fixed: "right",
    render: (_, record) => (
      <div className="flex justify-end gap-3">
        <Button>View</Button>
        <Button type="primary">Edit</Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </div>
    ),
  },
];
