import { useSelector } from "react-redux";
import { CellProps } from "react-table";
import StatusCell from "src/components/tables/cells/StatusCell";
import TextCell from "src/components/tables/cells/TextCell";
import { hasEditAccess } from "src/redux/selectors/app";
import ActionsCell from "./ActionsCell";
import ListTextCell from "./ListTextCell";
import { RoleType } from "./role-types";

const useRolesTableColumns = ({
  onDelete,
  handleRoleStatusChange,
}: {
  onDelete: (id: number) => void;
  handleRoleStatusChange: (roleId: number, status: boolean) => void;
}) => {
  const hasEditPermission = useSelector(hasEditAccess);

  return [
    {
      Header: "Role Name",
      accessor: "name",
      className: "min-w-[180px]",
      Cell: TextCell,
    },
    {
      Header: "Permissions",
      accessor: "permissions",
      className: "min-w-[150px]",
      Cell: ListTextCell,
    },
    {
      Header: "Create Date",
      accessor: "createdAt",
      className: "min-w-[150px]",
      Cell: TextCell,
    },
    {
      Header: "Status",
      accessor: "active",
      className: "min-w-[80px]",
      Cell: ({ value, row }: CellProps<RoleType>) => (
        <StatusCell
          value={value}
          onChange={(value) => handleRoleStatusChange(row.original.id, value)}
          disabled={!hasEditPermission}
          tooltip={
            hasEditPermission ? "" : "You don't have permission to edit."
          }
        />
      ),
    },
    {
      Header: "Actions",
      accessor: "id",
      className: "min-w-[200px]",
      Cell: ({ value }: CellProps<RoleType>) => (
        <ActionsCell value={value} onDelete={() => onDelete(value)} />
      ),
    },
  ];
};

export default useRolesTableColumns;
