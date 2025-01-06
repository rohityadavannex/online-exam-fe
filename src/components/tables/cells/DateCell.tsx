import { getFormattedDate } from "src/helpers/helpers";
import TextCell from "./TextCell";

const DateCell = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  const formattedDate = getFormattedDate(value);

  return (
    <>
      <TextCell value={formattedDate} className={className} />
    </>
  );
};

export default DateCell;
