import type { TableProps } from "antd";
import { Button, Table, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { RolesResponse, useGetRoles } from "./apis";

const RolesList: React.FC = () => {
  useSetActiveTab(TAB_NAMES.ROLES);
  const navigate = useNavigate();
  const { isLoading, data } = useGetRoles();

  const columns = useRoleColumns();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">All Roles</span>
        <Button
          onClick={() => navigate("/roles/create")}
          type="primary"
          disabled={isLoading}
        >
          Add Role
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data?.data ?? []}
        loading={isLoading}
      />
    </div>
  );
};

export default RolesList;

const useRoleColumns = () => {
  const navigate = useNavigate();
  return [
    {
      title: () => <div className="flex justify-center">Role Name</div>,
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="flex justify-center gap-3">{text}</div>,
    },
    {
      title: () => <div className="flex justify-center grow">Permissions</div>,
      key: "permissions",
      dataIndex: "permissions",
      render: (value, { permissions }) => {
        return (
          <div className="flex grow">
            {permissions?.map(({ id, moduleName }) => {
              return <Tag key={id}>{moduleName}</Tag>;
            })}
          </div>
        );
      },
    },
    {
      title: () => (
        <div className="flex justify-end">
          <div className="flex justify-center w-[240px]">Action</div>
        </div>
      ),
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-3">
          <Button
            type="primary"
            onClick={() => navigate(`/roles/create/${record.id}`)}
          >
            Edit
          </Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ] as TableProps<RolesResponse>["columns"];
};
