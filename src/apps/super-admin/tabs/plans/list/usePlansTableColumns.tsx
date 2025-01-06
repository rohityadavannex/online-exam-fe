import { CellProps } from "react-table";
import StatusCell from "src/components/tables/cells/StatusCell";
import TextCell from "src/components/tables/cells/TextCell";
import ListTextCell from "../../roles/list/ListTextCell";
import ActionsCell from "./ActionsCell";
import { PlanType } from "./plan-types";

const usePlansTableColumns = ({
  onDelete,
  handlePlanStatusChange,
}: {
  onDelete: (id: number) => void;
  handlePlanStatusChange: (planId: number, status: boolean) => void;
}) => {
  return [
    {
      Header: "Plan Name",
      accessor: "name",
      className: "min-w-[180px]",
      Cell: TextCell,
    },
    {
      Header: "Price (₹)",
      accessor: "price",
      className: "min-w-[150px]",
      Cell: TextCell,
    },
    {
      Header: "Features",
      accessor: "features",
      className: "min-w-[150px]",
      Cell: ListTextCell,
    },
    {
      Header: "Duration",
      accessor: "duration",
      className: "min-w-[150px]",
      Cell: TextCell,
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
      Cell: ({ value, row }: CellProps<PlanType>) => (
        <StatusCell
          value={value}
          onChange={(value) => handlePlanStatusChange(row.original.id, value)}
        />
      ),
    },
    {
      Header: "Actions",
      accessor: "id",
      className: "min-w-[200px]",
      Cell: ({ value }: CellProps<PlanType>) => (
        <ActionsCell value={value} onDelete={() => onDelete(value)} />
      ),
    },
  ];
};

export default usePlansTableColumns;
