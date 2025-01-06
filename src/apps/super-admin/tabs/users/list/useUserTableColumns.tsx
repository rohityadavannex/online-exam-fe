import { CellProps } from "react-table";
import StatusCell from "src/components/tables/cells/StatusCell";
import TextCell from "src/components/tables/cells/TextCell";
import ActionsCell from "./ActionsCell";
import { UserType } from "./user-types";

const useUserTableColumns = ({
  onDelete,
  handleUserStatusChange,
}: {
  onDelete: (id: number) => void;
  handleUserStatusChange: (userId: number, status: boolean) => void;
}) => {
  return [
    {
      Header: "Full Name",
      accessor: "name",
      className: "min-w-[180px]",
      Cell: TextCell,
    },
    {
      Header: "Email",
      accessor: "email",
      className: "min-w-[150px]",
      Cell: TextCell,
    },
    // {
    //   Header: "GST",
    //   accessor: "gst",
    //   className: "min-w-[150px]",
    //   Cell: TextCell,
    // },
    // {
    //   Header: "Fax",
    //   accessor: "fax",
    //   className: "min-w-[180px]",
    //   Cell: TextCell,
    // },
    {
      Header: "Contact",
      accessor: "phone",
      className: "min-w-[150px]",
      Cell: ({ value, row }: CellProps<UserType>) => {
        return (
          <div className="flex flex-col p-[10px]">
            <TextCell value={value} className="!p-0" />
            <TextCell
              value={row?.original?.alternatePhone ?? "-"}
              className="!p-0"
            />
          </div>
        );
      },
      // Cell: TextCell,
    },
    {
      Header: "Address",
      accessor: "address",
      className: "min-w-[150px]",
      Cell: TextCell,
    },
    // {
    //   Header: "Country",
    //   accessor: "country",
    //   className: "min-w-[150px]",
    //   Cell: TextCell,
    // },
    // {
    //   Header: "State",
    //   accessor: "state",
    //   className: "min-w-[150px]",
    //   Cell: TextCell,
    // },
    {
      Header: "City",
      accessor: "city",
      className: "min-w-[10px]",
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
      Cell: ({ value, row }: CellProps<UserType>) => (
        <StatusCell
          value={value}
          onChange={(value) => handleUserStatusChange(row.original.id, value)}
        />
      ),
    },
    {
      Header: "Actions",
      accessor: "id",
      className: "min-w-[200px]",
      Cell: ({ value }: CellProps<UserType>) => (
        <ActionsCell value={value} onDelete={() => onDelete(value)} />
      ),
    },
  ];
};

export default useUserTableColumns;
