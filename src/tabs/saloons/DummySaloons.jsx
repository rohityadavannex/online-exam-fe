import { useMemo } from "react";
import ReactTable from "../../components/tables/react-table/ReactTable";

const DummySaloons = () => {
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        Cell: CellContent,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        Cell: CellContent,
      },
      {
        Header: "Age",
        accessor: "age",
        width: 50,
        Cell: CellContent,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 60,
        Cell: CellContent,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: CellContent,
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
        Cell: CellContent,
      },
    ],
    []
  );

  const data = useMemo(() => {
    return [
      {
        firstName: "User2",
        lastName: "test",
        age: 30,
        visits: 3000,
        status: "active",
        progress: 40,
      },
      {
        firstName: "User2",
        lastName: "test",
        age: 30,
        visits: 3000,
        status: "active",
        progress: 40,
      },
      {
        firstName: "User2",
        lastName: "test",
        age: 30,
        visits: 3000,
        status: "active",
        progress: 40,
      },
      {
        firstName: "User2",
        lastName: "test",
        age: 30,
        visits: 3000,
        status: "active",
        progress: 40,
      },
      {
        firstName: "User2",
        lastName: "test",
        age: 30,
        visits: 3000,
        status: "active",
        progress: 40,
      },
      {
        firstName: "User2",
        lastName: "test",
        age: 30,
        visits: 3000,
        status: "active",
        progress: 40,
      },
      {
        firstName: "User2",
        lastName: "test",
        age: 30,
        visits: 3000,
        status: "active",
        progress: 40,
      },
      {
        firstName: "User2",
        lastName: "test",
        age: 30,
        visits: 3000,
        status: "active",
        progress: 40,
      },
      {
        firstName: "User2",
        lastName: "test",
        age: 30,
        visits: 3000,
        status: "active",
        progress: 40,
      },
      {
        firstName: "User2",
        lastName: "test",
        age: 30,
        visits: 3000,
        status: "active",
        progress: 40,
      },
    ];
  }, []);

  return <ReactTable columns={columns} data={data} />;
};

export default DummySaloons;

const CellContent = ({ value }) => (
  <div className="h-[40px] flex justify-center items-center">{value}</div>
);
