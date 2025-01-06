import { isEqual } from "lodash";
import { forwardRef, memo, useEffect, useMemo, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRowSelect, useSortBy, useTable } from "react-table";
import { generateRandomId } from "src/helpers/helpers";
import usePrevious from "src/hooks/usePrevious";
import { ArrowDownIcon } from "src/icons/ArrowDownIcon";
import { ArrowUpIcon } from "src/icons/ArrowUpIcon";
import { FileIcon } from "src/icons/FileIcon";
import { SortingIcon } from "src/icons/SortingIcon";
import Pagination from "./Pagination";
import "./react-table.scss";

type PaginationType = {
  setLength: (length: number) => void;
  length: number;
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function ReactTable({
  columns,
  data,
  isLoading,
  pagination,
  className = "",
  checkbox = false,
  onCheckboxClick,
}: {
  columns: any[];
  data: any[];
  isLoading: boolean;
  pagination?: PaginationType;
  className?: string;
  checkbox?: boolean;
  onCheckboxClick?: (data: any[]) => void;
}) {
  const hasData = useMemo(() => data.length > 0, [data.length]);
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      if (!checkbox) return;
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row: { getToggleRowSelectedProps } }) => (
            <Checkbox {...getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  const memoizedData = useMemo(
    () => selectedFlatRows.map((row) => row.original),
    [selectedFlatRows]
  );

  const prevSelectedRows = usePrevious(memoizedData);

  useEffect(() => {
    if (!isEqual(memoizedData, prevSelectedRows) && onCheckboxClick) {
      onCheckboxClick(selectedFlatRows.map((row) => row.original));
    }
  }, [
    selectedFlatRows,
    onCheckboxClick,
    checkbox,
    prevSelectedRows,
    memoizedData,
  ]);

  const tableUi = useMemo(() => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={columns.length} className="text-center">
            <Skeleton count={7} height={40} />
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan={columns.length} className="h-[320px]">
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center h-[108px] w-[108px] bg-primary-100 rounded-full ">
              <FileIcon />
            </div>
            <div className="font-bold text-26px text-center">
              No data Available
            </div>
          </div>
        </td>
      </tr>
    );
  }, [columns.length, isLoading]);

  // Render the UI for your table
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex overflow-x-auto scrollbar-thin">
        <table {...getTableProps()} className={className}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={generateRandomId()}
              >
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      // @ts-ignore
                      className={column.className}
                      key={column.id}
                    >
                      <div className="flex gap-2.5 items-center justify-center">
                        {column.render("Header")}
                        {column.id !== "selection" && (
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ArrowUpIcon />
                              ) : (
                                <ArrowDownIcon />
                              )
                            ) : (
                              <SortingIcon />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {isLoading || !hasData
              ? tableUi
              : rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={i}>
                      {row.cells.map((cell, j) => {
                        return (
                          <td {...cell.getCellProps()} key={j}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      {pagination && hasData && (
        <Pagination
          setLength={pagination.setLength}
          length={pagination.length}
          total={pagination.total}
          page={pagination.page}
          setPage={pagination.setPage}
        />
      )}
    </div>
  );
}

export default memo(ReactTable);

const Checkbox = forwardRef(({ indeterminate, ...rest }: any, ref: any) => {
  const defaultRef = useRef();
  useEffect(() => {
    if (typeof defaultRef.current !== "undefined") {
      // @ts-ignore
      defaultRef.current.indeterminate = indeterminate;
    }
  }, [defaultRef, indeterminate]);
  return (
    <input
      type="checkbox"
      className="w-5 h-5 rounded-[4px] border-[#D1D1D1] border-[1.5px] ml-[34px] mr-[24px]"
      ref={ref || defaultRef}
      {...rest}
    />
  );
});
