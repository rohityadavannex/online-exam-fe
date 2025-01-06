import type { TableProps } from "antd";
import { Button, Switch, Table } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { UsersResponse, useGetUsers } from "./api";

const Users = () => {
  useSetActiveTab(TAB_NAMES.USERS);
  const navigate = useNavigate();
  const columns = useColumns();
  const { isLoading, data, error } = useGetUsers();

  const organizations = useMemo(() => {
    return data?.data ?? [];
  }, [data?.data]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">All Users</span>
        <Button onClick={() => navigate("/users/create")} type="primary">
          Add Users
        </Button>
      </div>

      <Table columns={columns} dataSource={organizations} loading={isLoading} />
    </div>
  );
};

export default Users;

const useColumns = () => {
  const navigate = useNavigate();
  return [
    {
      title: () => <div className="flex justify-center">Name</div>,
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="flex justify-center">{text}</div>,
    },
    {
      title: () => <div className="flex justify-center">Email</div>,
      dataIndex: "email",
      key: "email",
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
      title: () => (
        <div className="flex justify-end">
          <div className="flex justify-center w-[240px]">Action</div>
        </div>
      ),
      key: "id",
      fixed: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-3">
          <Button
            type="primary"
            onClick={() => navigate(`/users/create/${record.id}`)}
          >
            Edit
          </Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ] as TableProps<UsersResponse>["columns"];
};
