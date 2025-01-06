import ButtonV1 from "src/components/buttons/ButtonV1";
import { LeftArrowIcon } from "src/icons/LeftArrowIcon";
import { RightArrowIcon } from "src/icons/RightArrowIcon";
import ShowingCountDropdown from "./ShowingCountDropdown";

const Pagination = ({
  setLength,
  length,
  total,
  page,
  setPage,
}: {
  length: number;
  setLength: (val: number) => void;
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex items-center justify-between">
      <ShowingCountDropdown setLength={setLength} length={length} />
      <div className="text-14px">
        Showing{" "}
        <span className="font-bold">
          {page === 1 ? page : (page - 1) * length + 1}
        </span>{" "}
        to{" "}
        <span className="font-bold">
          {page * length > total ? total : page * length}
        </span>{" "}
        out of <span className="font-bold">{total}</span> records.
      </div>
      <PaginationButtons
        total={total}
        length={length}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Pagination;

const PaginationButtons = ({
  total,
  length,
  page: currentPage,
  setPage,
}: {
  total: number;
  length: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pageCount = Math.ceil(total / length);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Total buttons to show (including dots)
    const startPage = 1;
    const endPage = pageCount;

    if (pageCount <= maxButtons) {
      // If total pages are less than or equal to max buttons, show all
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(renderButton(i));
      }
    } else {
      // Always show the first page
      buttons.push(renderButton(1));

      // Show dots if there's a gap
      if (currentPage > 3) {
        buttons.push(<span key="dots-start">...</span>);
      }

      // Calculate the range of pages to show
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(pageCount - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(renderButton(i));
      }

      // Show dots if there's a gap
      if (currentPage < pageCount - 2) {
        buttons.push(<span key="dots-end">...</span>);
      }

      // Always show the last page
      buttons.push(renderButton(pageCount));
    }

    return buttons;
  };

  const renderButton = (page: number) => (
    <ButtonV1
      text={page}
      onClick={() => setPage(page)}
      primary={page === currentPage}
      key={page}
    />
  );

  return (
    <div className="flex gap-1 items-center">
      <ButtonV1
        icon={() => <LeftArrowIcon color="#202224" />}
        className="!bg-transparent !border-0"
        onClick={() => setPage((prev) => prev - 1)}
        isDisabled={currentPage === 1}
      />
      {renderPaginationButtons()}
      <ButtonV1
        icon={() => <RightArrowIcon color="#202224" />}
        className="!bg-transparent !border-0"
        onClick={() => setPage((prev) => prev + 1)}
        isDisabled={currentPage === pageCount}
        // isDisabled={currentPage}
      />
    </div>
  );
};
